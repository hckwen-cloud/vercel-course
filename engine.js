/* 교재 엔진: 단계 이동, 커서 애니메이션, 깜빡임/체크 표시, 음성 읽기 */
(function () {
  'use strict';
  var STEPS = window.STEPS, SCREENS = window.SCREENS;
  var $ = function (s) { return document.querySelector(s); };
  var stage = $('#stage'), wrap = $('#stageWrap'), screenEl = $('#screen'), fx = $('#fx'), cur = $('#cursor'), cap = $('#caption');
  var W = 1000, H = 660;
  var CANCEL = { cancel: true };
  var idx = 0, runId = 0, playing = false, paused = false, started = false;
  var pos = { x: 500, y: 330 };

  /* ---------- 저장 (실패해도 동작) ---------- */
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('vccourse:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('vccourse:' + k, JSON.stringify(v)); } catch (e) {} }
  };
  var opt = Object.assign({ voice: true, rate: 1.05, voiceName: '', auto: false, cap: true }, store.get('opt', {}));
  var done = store.get('done', {});

  /* ---------- 화면 크기 맞춤 ---------- */
  function scale() { return stage.getBoundingClientRect().width / W; }
  function fit() {
    var s = Math.min((wrap.clientWidth - 24) / W, (wrap.clientHeight - 24) / H);
    stage.style.transform = 'translate(-50%,-50%) scale(' + Math.max(0.2, s) + ')';
  }
  window.addEventListener('resize', fit);
  if (window.ResizeObserver) new ResizeObserver(fit).observe(wrap);

  function rel(el) {
    var r = el.getBoundingClientRect(), b = stage.getBoundingClientRect(), s = b.width / W;
    return { x: (r.left - b.left) / s, y: (r.top - b.top) / s, w: r.width / s, h: r.height / s };
  }
  function T(name) {
    var el = screenEl.querySelector('[data-t="' + name + '"]');
    if (!el) console.warn('대상 없음:', name);
    return el;
  }

  /* ---------- 대기 (일시정지·취소 처리) ---------- */
  var SPEED = 1; // 점검용: window.__course.speed 로 조절
  function sleep(ms, id) {
    return new Promise(function (res) { setTimeout(res, ms * SPEED); }).then(function wait() {
      if (id !== runId) throw CANCEL;
      if (paused) return new Promise(function (r) { setTimeout(r, 120); }).then(wait);
    });
  }

  /* ---------- 화면 그리기 ---------- */
  function clearFx() { fx.innerHTML = ''; }
  function renderScreen(name, arg) {
    var fn = SCREENS[name];
    if (!fn) { console.warn('화면 없음:', name); return; }
    clearFx();
    screenEl.innerHTML = fn(arg || {});
  }

  /* ---------- 커서 ---------- */
  function setCursor(x, y, ms) {
    cur.style.transition = ms ? 'transform ' + ms + 'ms cubic-bezier(.45,.05,.25,1)' : 'none';
    cur.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    pos = { x: x, y: y };
  }
  function center(el) {
    var r = rel(el);
    var x = r.w > 260 ? r.x + Math.min(r.w * 0.5, 140) : r.x + r.w / 2;
    return { x: x, y: r.y + r.h / 2 };
  }
  function moveTo(el, id) {
    var c = center(el);
    var d = Math.hypot(c.x - pos.x, c.y - pos.y);
    var ms = Math.round(Math.min(1100, 350 + d * 0.9));
    setCursor(c.x, c.y, ms);
    return sleep(ms + 60, id);
  }
  function ripple() {
    var r = document.createElement('div');
    r.className = 'ripple';
    r.style.left = pos.x + 'px'; r.style.top = pos.y + 'px';
    fx.appendChild(r);
    setTimeout(function () { r.remove(); }, 700);
  }
  function pad(r, p) { return { x: r.x - p, y: r.y - p, w: r.w + p * 2, h: r.h + p * 2 }; }
  function place(div, r) { div.style.left = r.x + 'px'; div.style.top = r.y + 'px'; div.style.width = r.w + 'px'; div.style.height = r.h + 'px'; }

  /* ---------- 동작 ---------- */
  var ACT = {
    screen: function (a, id) {
      screenEl.classList.add('fade');
      return sleep(180, id).then(function () {
        renderScreen(a[1], a[2]);
        screenEl.classList.remove('fade');
        return sleep(260, id);
      });
    },
    move: function (a, id) { var el = T(a[1]); return el ? moveTo(el, id) : null; },
    click: function (a, id) {
      var el = T(a[1]); if (!el) return null;
      return moveTo(el, id).then(function () {
        cur.classList.add('press'); el.classList.add('pressed'); ripple();
        return sleep(220, id);
      }).then(function () {
        cur.classList.remove('press'); el.classList.remove('pressed');
        return sleep(260, id);
      });
    },
    blink: function (a, id) {
      var el = T(a[1]); if (!el) return null;
      var ring = document.createElement('div');
      ring.className = 'ring';
      place(ring, pad(rel(el), 5));
      fx.appendChild(ring);
      return sleep(a[2] || 1900, id).then(function () {
        ring.classList.add('fadeout');
        setTimeout(function () { ring.remove(); }, 320);
      });
    },
    check: function (a, id) {
      var el = T(a[1]); if (!el) return null;
      var r = pad(rel(el), 4);
      var box = document.createElement('div'); box.className = 'okbox'; place(box, r);
      var c = document.createElement('div'); c.className = 'chk'; c.textContent = '✓';
      c.style.left = (r.x + r.w - 14) + 'px'; c.style.top = (r.y - 12) + 'px';
      fx.appendChild(box); fx.appendChild(c);
      return sleep(a[2] || 450, id);
    },
    type: function (a, id) {
      var el = T(a[1]); if (!el) return null;
      var text = String(a[2]), i = 0;
      el.textContent = ''; el.classList.add('typing');
      function step() {
        if (i >= text.length) { el.classList.remove('typing'); return sleep(250, id); }
        el.textContent = text.slice(0, ++i);
        return sleep(text.length > 24 ? 45 : 85, id).then(step);
      }
      return step();
    },
    show: function (a) { var el = T(a[1]); if (el) el.classList.remove('hidden'); },
    hide: function (a) { var el = T(a[1]); if (el) el.classList.add('hidden'); },
    on: function (a) {
      var el = T(a[1]); if (!el) return;
      Array.prototype.forEach.call(el.parentElement.children, function (s) { s.classList.remove('on'); });
      el.classList.add('on');
    },
    set: function (a) { var el = T(a[1]); if (el) el.innerHTML = a[2]; },
    wait: function (a, id) { return sleep(a[1], id); },
    drag: function (a, id) {
      // ['drag', 출발 대상, 도착 대상, [끌고 가는 이름들]]
      var from = T(a[1]), to = T(a[2]); if (!from || !to) return null;
      var labels = a[3] || ['파일'];
      return moveTo(from, id).then(function () {
        cur.classList.add('press');
        var g = document.createElement('div'); g.className = 'ghost';
        g.textContent = labels.length > 1 ? '📄 ' + labels[0] + ' 외 ' + (labels.length - 1) + '개' : '📄 ' + labels[0];
        g.style.left = (pos.x + 14) + 'px'; g.style.top = (pos.y + 14) + 'px';
        fx.appendChild(g);
        var c = center(to), ms = 1300;
        g.style.transition = 'left ' + ms + 'ms cubic-bezier(.45,.05,.25,1), top ' + ms + 'ms cubic-bezier(.45,.05,.25,1)';
        void g.offsetWidth;
        setCursor(c.x, c.y, ms);
        g.style.left = (c.x + 14) + 'px'; g.style.top = (c.y + 14) + 'px';
        return sleep(ms + 120, id).then(function () { cur.classList.remove('press'); ripple(); g.remove(); return sleep(200, id); });
      });
    }
  };

  function runActs(acts, id) {
    var p = Promise.resolve();
    (acts || []).forEach(function (a) {
      p = p.then(function () { if (id !== runId) throw CANCEL; return ACT[a[0]] ? ACT[a[0]](a, id) : console.warn('알 수 없는 동작', a); });
    });
    return p;
  }

  /* ---------- 음성 ---------- */
  var synth = window.speechSynthesis || null;
  var voices = [], keep = [];
  var SAY_FIX = [
    ['hong-stock-journal.vercel.app', '홍 스톡저널 닷 버셀 닷 앱'],
    ['stock-journal-a1b2c3.vercel.app', '스톡저널 닷 버셀 닷 앱'],
    ['vercel.com/signup', '버셀 닷 컴 슬래시 사인업'], ['vercel.app', '버셀 닷 앱'],
    ['github.com/signup', '깃허브 닷 컴 슬래시 사인업'],
    ['hong-trader/stock-journal', '홍 트레이더의 스톡저널'],
    ['hong-stock-journal', '홍 스톡저널'], ['hong-trader', '홍 트레이더'], ['stock-journal', '스톡저널'],
    ['vercel.json', '버셀 점 제이슨'], ['/api/', ' 에이피아이 슬래시 '], ['api 폴더', '에이피아이 폴더'],
    ['manifest.webmanifest', '매니페스트 파일'], ['index.html', '인덱스 점 에이치티엠엘'], ['README.md', '리드미 파일'],
    ['sw.js', '에스더블유 점 제이에스'], ['ACCESS_CODE', '액세스 코드'], ['APP_VER', '앱 버전'],
    ['Cloudflare Pages', '클라우드플레어 페이지스'], ['GitLab', '깃랩'], ['Bitbucket', '비트버킷'], ['Copilot', '코파일럿'],
    ['Next.js', '넥스트 제이에스'], ['NOT_FOUND', '낫 파운드'], ['Hobby', '하비'],
    ['npm run build', '엔피엠 런 빌드'], ['Jira', '지라'], ['HTTPS', '에이치티티피에스'], ['DNS', '디엔에스'], ['F5', '에프 파이브'],
    ['GitHub', '깃허브'], ['Netlify', '넷리파이'], ['Vercel', '버셀'], ['vercel', '버셀'], ['PWA', '피 더블유 에이'], ['API', '에이피아이']
  ];
  function plain(html) { var d = document.createElement('div'); d.innerHTML = html; return d.textContent; }
  function forSpeech(t) { SAY_FIX.forEach(function (p) { t = t.split(p[0]).join(p[1]); }); return t; }

  function loadVoices() {
    if (!synth) return;
    voices = synth.getVoices().filter(function (v) { return /^ko/i.test(v.lang); });
    var sel = $('#optVoiceName');
    sel.innerHTML = '';
    if (!voices.length) { sel.innerHTML = '<option value="">기본 한국어 목소리</option>'; return; }
    var score = function (v) { return (/Natural|Online|Neural/i.test(v.name) ? 3 : 0) + (/SunHi|InJoon|Heami/i.test(v.name) ? 1 : 0) + (/Google/i.test(v.name) ? 2 : 0); };
    voices.sort(function (a, b) { return score(b) - score(a); });
    voices.forEach(function (v) {
      var o = document.createElement('option');
      o.value = v.name; o.textContent = v.name.replace(/Microsoft\s*/i, '').replace(/\s*-\s*Korean.*$/i, '').replace(/\(.*?\)/g, '').trim() || v.name;
      sel.appendChild(o);
    });
    if (opt.voiceName && voices.some(function (v) { return v.name === opt.voiceName; })) sel.value = opt.voiceName;
  }
  if (synth) { loadVoices(); synth.onvoiceschanged = loadVoices; }

  function speak(html, id) {
    var text = plain(html);
    if (!opt.voice || !synth) return sleep(Math.max(1400, text.length * 95 / opt.rate), id);
    return new Promise(function (res) {
      var u = new SpeechSynthesisUtterance(forSpeech(text));
      u.lang = 'ko-KR'; u.rate = opt.rate;
      var v = voices.filter(function (x) { return x.name === $('#optVoiceName').value; })[0] || voices[0];
      if (v) u.voice = v;
      var fin = false, finish = function () { if (!fin) { fin = true; keep.splice(keep.indexOf(u), 1); res(); } };
      u.onend = finish; u.onerror = finish;
      keep.push(u);
      synth.speak(u);
      // 음성이 끝났다는 신호가 오지 않을 때를 대비한 안전장치
      (function guard(t) { setTimeout(function () { if (fin) return; if (paused) return guard(500); if (id !== runId || t <= 0) finish(); else guard(t - 500); }, 500); })(text.length * 260 / opt.rate + 4000);
    }).then(function () { if (id !== runId) throw CANCEL; });
  }

  /* ---------- 오른쪽 패널 ---------- */
  function renderPanel() {
    var st = STEPS[idx];
    $('#chap').textContent = st.ch;
    $('#title').textContent = st.title;
    $('#script').innerHTML = st.segs.map(function (s, i) { return '<li data-n="' + (i + 1) + '">' + s.say + '</li>'; }).join('');
    var x = '';
    if (st.mission) {
      x += '<div class="box mission"><b class="h">🖐 직접 해 보세요</b>' + st.mission.text +
        (st.mission.links ? '<div class="links">' + st.mission.links.map(function (l) { return '<a href="' + l[1] + '" target="_blank" rel="noopener">' + l[0] + ' ↗</a>'; }).join('') + '</div>' : '') + '</div>';
    }
    if (st.tip) x += '<div class="box tip"><b class="h">💡 알아 두기</b>' + st.tip + '</div>';
    if (st.warn) x += '<div class="box warn"><b class="h">⚠️ 주의</b>' + st.warn + '</div>';
    $('#extra').innerHTML = x;
    $('#doneChk').checked = !!done[st.id];
    $('#toc').value = String(idx);
    $('#stepNo').textContent = (idx + 1) + ' / ' + STEPS.length;
    $('#progBar').style.width = ((idx + 1) / STEPS.length * 100) + '%';
    $('#prev').disabled = idx === 0;
    $('#next').disabled = idx === STEPS.length - 1;
    document.querySelector('.panelScroll').scrollTop = 0;
  }
  function markSeg(k) {
    var lis = document.querySelectorAll('#script li');
    Array.prototype.forEach.call(lis, function (li, i) {
      li.classList.toggle('now', i === k);
      li.classList.toggle('done', k < 0 ? i < lis.length && k === -2 : i < k);
    });
    var now = lis[k];
    if (now) now.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  function setPlayBtn() {
    $('#play').textContent = playing ? (paused ? '▶ 계속' : '⏸ 일시정지') : '▶ 재생';
  }

  /* ---------- 진행 ---------- */
  function stop() {
    runId++; paused = false; playing = false;
    if (synth) synth.cancel();
    cap.classList.remove('on');
    setPlayBtn();
  }
  function prepare() {
    // 단계의 첫 화면을 미리 보여 줌
    var first = STEPS[idx].segs[0].do || [];
    var s = first.filter(function (a) { return a[0] === 'screen'; })[0];
    if (s && first[0] === s) renderScreen(s[1], s[2]); else clearFx();
    setCursor(500, 360, 0);
  }
  function go(i, autoplay) {
    if (i < 0 || i >= STEPS.length) return;
    stop();
    idx = i;
    store.set('idx', idx);
    renderPanel();
    prepare();
    markSeg(-1);
    if (autoplay) run();
  }
  function run() {
    stop();
    var id = runId, st = STEPS[idx];
    playing = true; setPlayBtn();
    prepare();
    var p = Promise.resolve();
    st.segs.forEach(function (seg, k) {
      p = p.then(function () {
        markSeg(k);
        cap.textContent = plain(seg.say);
        cap.classList.toggle('on', !!opt.cap);
        return Promise.all([speak(seg.say, id), runActs(seg.do, id)]);
      }).then(function () { return sleep(350, id); });
    });
    p.then(function () {
      markSeg(-2);
      cap.classList.remove('on');
      playing = false; setPlayBtn();
      if (opt.auto && idx < STEPS.length - 1) return sleep(1500, id).then(function () { go(idx + 1, true); });
    }).catch(function (e) { if (e !== CANCEL) console.error(e); });
  }
  function togglePlay() {
    if (!playing) return run();
    paused = !paused;
    if (synth) { if (paused) synth.pause(); else synth.resume(); }
    setPlayBtn();
  }

  /* ---------- 연결 ---------- */
  var toc = $('#toc'), lastCh = null, grp = null;
  STEPS.forEach(function (st, i) {
    if (st.ch !== lastCh) { grp = document.createElement('optgroup'); grp.label = st.ch; toc.appendChild(grp); lastCh = st.ch; }
    var o = document.createElement('option'); o.value = String(i); o.textContent = (i + 1) + '. ' + st.title; grp.appendChild(o);
  });
  toc.onchange = function () { go(+toc.value, started); };
  $('#prev').onclick = function () { go(idx - 1, true); };
  $('#next').onclick = function () { go(idx + 1, true); };
  $('#replay').onclick = function () { run(); };
  $('#play').onclick = togglePlay;
  $('#doneChk').onchange = function () { done[STEPS[idx].id] = this.checked; store.set('done', done); };

  $('#optVoice').checked = opt.voice;
  $('#optRate').value = opt.rate;
  $('#optAuto').checked = opt.auto;
  $('#optCap').checked = opt.cap;
  function saveOpt() { store.set('opt', opt); }
  $('#optVoice').onchange = function () { opt.voice = this.checked; if (!opt.voice && synth) synth.cancel(); saveOpt(); };
  $('#optRate').onchange = function () { opt.rate = +this.value; saveOpt(); };
  $('#optAuto').onchange = function () { opt.auto = this.checked; saveOpt(); };
  $('#optCap').onchange = function () { opt.cap = this.checked; if (!opt.cap) cap.classList.remove('on'); saveOpt(); };
  $('#optVoiceName').onchange = function () { opt.voiceName = this.value; saveOpt(); };

  document.addEventListener('keydown', function (e) {
    if (!started || /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1, true); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1, true); }
    else if (e.key === ' ') { e.preventDefault(); togglePlay(); }
  });

  var saved = Math.min(store.get('idx', 0) || 0, STEPS.length - 1);
  if (saved > 0) {
    $('#startBtn').textContent = '▶ ' + (saved + 1) + '단계부터 이어서 하기';
    $('#restartBtn').classList.remove('hidden');
  }
  function begin(i) { started = true; $('#startOv').classList.add('hidden'); go(i, true); }
  $('#startBtn').onclick = function () { begin(saved); };
  $('#restartBtn').onclick = function () { begin(0); };

  var chCount = STEPS.reduce(function (a, s) { if (/^\d+장/.test(s.ch) && a.indexOf(s.ch) < 0) a.push(s.ch); return a; }, []).length;
  $('#ovCount').textContent = chCount + '개 장 ' + STEPS.length + '단계';

  window.__course = { go: go, setSpeed: function (s) { SPEED = s; } };
  fit();
  idx = saved; renderPanel(); prepare();
})();
