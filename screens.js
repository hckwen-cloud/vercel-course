/* 모의 화면 모음. data-t="이름" 이 붙은 요소를 커서가 가리킵니다.
   PC 화면은 Windows 11 + Microsoft Edge 모양, GitHub·Vercel은 2026년 화면 구성을 참고했습니다. */
(function () {
  var USER = 'hong-trader', REPO = 'stock-journal', TEAM = "hong-trader's projects";
  var URL0 = 'stock-journal-a1b2c3.vercel.app', URL1 = 'hong-stock-journal.vercel.app';

  function nav(items, on) {
    return items.map(function (s) {
      return '<div' + (s[1] ? ' data-t="' + s[1] + '"' : '') + (s[0] === on ? ' class="on"' : '') + '>' + (s[2] ? '<span class="ni">' + s[2] + '</span>' : '') + s[0] + '</div>';
    }).join('');
  }

  /* ---------- Windows 11 공통 ---------- */
  function caps() { return '<span class="caps"><i>&#x2500;</i><i>&#x25A2;</i><i class="x">&#x2715;</i></span>'; }
  function guessFav(u) { return /github/.test(u) ? 'gh' : /vercel\.com/.test(u) ? 'vc' : /vercel\.app/.test(u) ? 'app' : ''; }
  function fav(f) {
    if (f === 'gh') return '<b class="fav gh"></b>';
    if (f === 'vc') return '<b class="fav" style="background:#000;color:#fff;font-size:8px;line-height:16px">▲</b>';
    if (f === 'app') return '<b class="fav app">📈</b>';
    return '<b class="fav">🌐</b>';
  }
  /* Microsoft Edge 창 (최대화 상태) */
  function win(url, body, opt) {
    opt = opt || {};
    return '<div class="win ' + (opt.cls || '') + '">' +
      '<div class="win-top"><span class="tabact">▢</span><div class="win-tab">' + fav(opt.fav || guessFav(url)) + '<span class="tt">' + (opt.tab || url) + '</span><i>&#x2715;</i></div><span class="newtab">＋</span><span class="gh-sp"></span>' + caps() + '</div>' +
      '<div class="win-addr"><span class="nav">←</span><span class="nav">→</span><span class="nav">↻</span><span class="addr" data-t="addr"><span class="lock">🔒</span>' + url + '</span><span class="nav">☆</span><span class="nav">⋯</span><span class="prof">홍</span></div>' +
      '<div class="win-body">' + body + '</div></div>';
  }
  /* 작업 표시줄 */
  function taskbar(active) {
    function ic(k, html) { return '<span class="tb-i' + (active === k ? ' on' : '') + '">' + html + '</span>'; }
    return '<div class="tb"><div class="tb-c">' +
      '<span class="tb-i"><span class="winlogo"><i></i><i></i><i></i><i></i></span></span>' +
      '<span class="tb-search">🔍 검색</span>' +
      ic('exp', '<span class="foldico"></span>') + ic('edge', '<span class="edgeico"></span>') + ic('store', '🛍️') + ic('kakao', '💬') +
      '</div><div class="tb-r"><span>⌃</span><span>한</span><span>📶 🔊 🔋</span><span class="tb-clock">오후 2:30<br>2026-11-09</span></div></div>';
  }
  function pc(fn, active) { return function (a) { return fn(a || {}) + taskbar(active || 'edge'); }; }

  /* ---------- 파일 탐색기 (Windows 11) ---------- */
  var T0 = '2026-11-09 오후 1:20';
  var FILES = {
    root: [
      ['📁', 'api', T0, '파일 폴더', '', '서버 함수 (현재가 조회 등)', 'f-api'],
      ['📁', 'public', T0, '파일 폴더', '', '화면 파일 (사람들이 보는 부분)', 'f-public'],
      ['📄', 'README.md', T0, 'Markdown 원본 파일', '7KB', '설명서', 'f-readme'],
      ['⚙️', 'vercel.json', T0, 'JSON 원본 파일', '1KB', 'Vercel 설정 파일', 'f-json']
    ],
    public: [
      ['📁', 'icons', T0, '파일 폴더', '', '앱 아이콘 그림', 'f-icons'],
      ['🌐', 'index.html', T0, 'Microsoft Edge HTML Document', '87KB', '앱 화면 그 자체', 'f-index'],
      ['📱', 'manifest.webmanifest', T0, 'WEBMANIFEST 파일', '1KB', '앱 이름·아이콘 정보', 'f-manifest'],
      ['📜', 'sw.js', T0, 'JavaScript 파일', '2KB', '오프라인에서도 열리게 함', 'f-sw']
    ],
    api: [
      ['📁', '_lib', T0, '파일 폴더', '', '공용 도우미 (밑줄 폴더는 함수가 안 돼요)', 'f-lib'],
      ['📜', 'alerts.js', T0, 'JavaScript 파일', '7KB', '공시·리포트 알림 → /api/alerts', 'f-alerts'],
      ['📜', 'market.js', T0, 'JavaScript 파일', '13KB', '시황·이슈 요약 → /api/market', 'f-market'],
      ['📜', 'price.js', T0, 'JavaScript 파일', '9KB', '현재가 조회 → /api/price', 'f-price'],
      ['📜', 'risk.js', T0, 'JavaScript 파일', '8KB', '시장 위험 브리핑 → /api/risk', 'f-risk']
    ]
  };
  function expFrame(o) {
    return '<div class="exp' + (o.mini ? ' mini' : '') + '">' +
      '<div class="exp-title"><div class="exp-tab"><span class="foldico sm"></span><span class="tt">' + o.title + '</span><i>&#x2715;</i></div><span class="newtab">＋</span><span class="gh-sp"></span>' + caps() + '</div>' +
      '<div class="exp-bar"><span class="nav">←</span><span class="nav">→</span><span class="nav">↑</span>' + (o.mini ? '' : '<span class="nav">↻</span>') +
      '<div class="exp-path" data-t="path">' + o.crumbs.map(function (c, i) { return (i ? '<span class="sep">›</span>' : '') + '<span>' + c + '</span>'; }).join('') + '</div>' +
      (o.mini ? '' : '<div class="exp-search">🔍 ' + o.title + ' 검색</div>') + '</div>' +
      (o.mini ? '' : '<div class="exp-cmd"><span>⊕ 새로 만들기 ▾</span><span class="sep"></span><span>✂</span><span>⧉</span><span>📋</span><span>Ａ</span><span>↗</span><span>🗑</span><span class="sep"></span><span>⇅ 정렬 ▾</span><span>☰ 보기 ▾</span><span>⋯</span></div>') +
      o.body + '</div>';
  }
  function expNav(on) {
    var it = [['🏠', '홈'], ['🖼️', '갤러리'], ['☁️', 'OneDrive'], null, ['🖥️', '바탕 화면'], ['⬇️', '다운로드'], ['📄', '문서'], ['🖼️', '사진'], ['🎵', '음악'], null, ['💻', '내 PC'], ['🌐', '네트워크']];
    return '<div class="exp-nav">' + it.map(function (x) { return x ? '<div' + (x[1] === on ? ' class="on"' : '') + '><span>' + x[0] + '</span>' + x[1] + '</div>' : '<hr>'; }).join('') + '</div>';
  }
  function explorer(a) {
    var key = a.dir || 'root';
    var crumbs = ['💻', '내 PC', '문서', 'stock-journal'].concat(key === 'root' ? [] : [key]);
    var body = '<div class="exp-main">' + expNav('문서') + '<div class="exp-content">' +
      '<div class="exp-note" data-t="nameNote">💡 <b>stock-journal</b>은 예시 이름이에요. 수강생이 직접 만든 폴더라면 이름·위치는 달라도 됩니다.</div>' +
      '<table><tr><th style="width:30px"></th><th>이름</th><th>수정한 날짜</th><th>유형</th><th>크기</th><th class="ann">💬 하는 일 (교재 설명)</th></tr>' +
      FILES[key].map(function (f) {
        return '<tr class="f" data-t="' + f[6] + '"><td class="ic">' + f[0] + '</td><td>' + f[1] + '</td><td class="g">' + f[2] + '</td><td class="g">' + f[3] + '</td><td class="g r">' + f[4] + '</td><td class="desc">' + f[5] + '</td></tr>';
      }).join('') + '</table></div></div><div class="exp-status">' + FILES[key].length + '개 항목</div>';
    return expFrame({ title: key === 'root' ? 'stock-journal' : key, crumbs: crumbs, body: body });
  }
  function miniExplorer(sel) {
    return expFrame({ mini: true, title: 'stock-journal', crumbs: ['…', '문서', 'stock-journal'],
      body: '<div class="mini-list' + (sel ? ' sel' : '') + '" data-t="mItems"><div>📁 api</div><div>📁 public</div><div>📄 README.md</div><div>⚙️ vercel.json</div></div>' +
        '<div class="exp-status">4개 항목' + (sel ? ' &nbsp; 4개 항목 선택함' : '') + '</div>' });
  }

  /* ---------- GitHub ---------- */
  function ghTop(crumb, tabs) {
    return '<div class="gh-head"><div class="gh-top"><span class="gh-ham">☰</span><span class="gh-logo"></span><span class="gh-crumb">' + (crumb || 'Dashboard') + '</span><span class="gh-sp"></span>' +
      '<span class="gh-search" data-t="ghSearch">🔍 Type <kbd>/</kbd> to search</span><span class="gh-ic" data-t="ghCopilot">✦ ▾</span><span class="gh-div"></span>' +
      '<span class="gh-ic" data-t="plus">＋ ▾</span><span class="gh-ic" data-t="ghIssues">◎</span><span class="gh-ic" data-t="ghPR">⇄</span><span class="gh-ic" data-t="ghInbox">✉</span><span class="av" data-t="ghAv">홍</span></div>' +
      (tabs ? '<div class="gh-tabs"><span class="on">&lt;&gt; Code</span><span>◎ Issues</span><span>⇄ Pull requests</span><span>▷ Actions</span><span>▦ Projects</span><span>🛡 Security</span><span>📈 Insights</span><span>⚙ Settings</span></div>' : '') + '</div>';
  }
  function repoCrumb() { return '<span class="gh-own">' + USER + '</span> / <b>' + REPO + '</b>'; }
  function ghSignup() {
    var inp = function (t, v) { return '<div class="inp wide gs" data-t="' + t + '">' + (v || '') + '</div>'; };
    return win('github.com/signup', '<div class="gh" style="display:flex">' +
      '<div class="gs-left"><div class="gh-logo inv"></div><div style="font-size:26px;font-weight:700;line-height:1.3;margin-top:26px">Create your free account</div>' +
      '<div style="color:#9198a1;margin-top:10px;font-size:14px">Explore GitHub\'s core features for individuals and organizations.</div>' +
      '<div style="margin-top:20px;color:#9198a1;font-size:13px">See what\'s included ›</div><div class="gs-art">🐙 ✦ 🚀</div></div>' +
      '<div class="gs-right"><div style="text-align:right;font-size:13px;color:#59636e">Already have an account? <a>Sign in →</a></div>' +
      '<div style="width:380px;margin:18px auto 0"><div style="font-size:22px;font-weight:600;margin-bottom:12px">Sign up for GitHub</div>' +
      '<div style="display:flex;gap:8px;margin-bottom:8px"><span class="gbtn gray" style="flex:1;text-align:center">G &nbsp;Continue with Google</span><span class="gbtn gray" style="flex:1;text-align:center"> Continue with Apple</span></div>' +
      '<div style="text-align:center;color:#59636e;font-size:12px;margin-bottom:4px">or</div>' +
      '<div class="field sm"><label>Email*</label>' + inp('gEmail') + '</div>' +
      '<div class="field sm"><label>Password*</label>' + inp('gPw') + '<div class="muted">Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.</div></div>' +
      '<div class="field sm"><label>Username*</label>' + inp('gUser') + '</div>' +
      '<div class="field sm"><label>Your Country/Region*</label>' + inp('', 'South Korea ▾') + '</div>' +
      '<div class="gbtn dark" data-t="gCont" style="display:block;text-align:center;padding:8px">Continue ›</div></div></div></div>', { tab: 'Join GitHub · GitHub' });
  }
  function ghHome() {
    return win('github.com', '<div class="gh">' + ghTop() +
      '<div class="menu hidden" data-t="plusMenu" style="right:118px;top:44px;min-width:230px">' +
      '<div data-t="newRepo" class="em">📕 New repository</div><div data-t="mImport">⇪ Import repository</div><hr>' +
      '<div data-t="mCodespace">🖥 New codespace</div><div data-t="mGist">&lt;&gt; New gist</div><hr>' +
      '<div data-t="mOrg">🏢 New organization</div><div data-t="mProject">▦ New project</div></div>' +
      '<div style="display:flex;height:100%">' +
      '<div class="gh-dside"><div data-t="topRepos"><div style="display:flex;justify-content:space-between;align-items:center;font-weight:600;font-size:14px">Top repositories <span class="gbtn" data-t="newBtn" style="padding:2px 10px;font-size:12px">📕 New</span></div>' +
      '<div class="inp wide" style="margin-top:10px;font-size:12px;color:#8c959f">Find a repository…</div>' +
      '<div style="margin-top:14px;color:#59636e;font-size:13px">아직 저장소가 없어요</div></div></div>' +
      '<div style="flex:1;padding:18px 24px"><div style="font-size:20px;font-weight:600;margin-bottom:12px">Home</div>' +
      '<div class="tbl" data-t="copilotBox" style="padding:12px 14px"><div class="inp wide" style="color:#8c959f">✦ Ask Copilot</div><div style="margin-top:8px;display:flex;gap:6px;font-size:12px"><span class="chip">Create a profile README</span><span class="chip">Explain a repository</span><span class="chip">Write code</span></div></div>' +
      '<div class="tbl" style="margin-top:14px"><div class="tbl-h">👋 Welcome to GitHub, hong-trader!</div><div style="padding:14px 16px;color:#59636e;font-size:13px">Start a new repository · Introduce yourself with a profile README · Use tools of the trade</div></div>' +
      '<div class="tbl" style="margin-top:14px;height:120px;background:#f6f8fa"><div class="tbl-h">Feed</div></div></div>' +
      '<div style="width:230px;padding:18px 16px;border-left:1px solid #d0d7de"><div style="font-weight:600;font-size:14px">Latest changes</div>' +
      '<div class="muted" style="margin-top:10px;line-height:1.9">• Copilot updates<br>• Repository creation improved<br>• New security features<br><a>View changelog →</a></div></div></div></div>', { tab: 'GitHub' });
  }
  function ddRow(label, desc, ctl) {
    return '<div class="cfgrow"><div><b>' + label + '</b> <span class="muted">' + desc + '</span></div>' + ctl + '</div>';
  }
  function ghNewRepo() {
    return win('github.com/new', '<div class="gh">' + ghTop('New repository') +
      '<div style="width:700px;margin:4px auto 0">' +
      '<div style="font-size:20px;font-weight:600">Create a new repository</div>' +
      '<div class="muted" style="margin-bottom:8px">Repositories contain a project\'s files and version history. Have a project elsewhere? <a>Import a repository.</a></div>' +
      '<div class="sec-h" data-t="sec1"><span class="num">1</span> General</div>' +
      '<div style="display:flex;gap:8px;align-items:flex-end;margin-bottom:4px"><div data-t="owner"><label class="lb">Owner *</label><div class="inp">🟣 ' + USER + ' ▾</div></div><div style="padding-bottom:6px">/</div>' +
      '<div style="flex:1"><label class="lb">Repository name *</label><div class="inp wide" data-t="repoName"></div></div></div>' +
      '<div class="muted" style="margin-bottom:4px"><span class="hidden" data-t="avail" style="color:#1a7f37;font-weight:600">✔ stock-journal is available. </span>Great repository names are short and memorable.</div>' +
      '<div data-t="desc"><label class="lb">Description <span class="muted" style="font-weight:400">· 0 / 350 characters</span></label><div class="inp wide" style="min-height:28px;padding:3px 10px"></div></div>' +
      '<div class="sec-h" data-t="sec2"><span class="num">2</span> Configuration</div>' +
      '<div style="position:relative"><div class="tbl cfgbox">' +
      ddRow('Choose visibility *', 'Choose who can see and commit to this repository', '<span class="gbtn gray sm" data-t="visDD">🌐 Public ▾</span>') +
      ddRow('Start with a template', 'Templates pre-configure your repository with files.', '<span class="gbtn gray sm" data-t="tplDD">No template ▾</span>') +
      ddRow('Add README', 'READMEs can be used as longer descriptions.', '<span class="toggle" data-t="readmeTg"><i></i> Off</span>') +
      ddRow('Add .gitignore', '.gitignore tells git which files not to track.', '<span class="gbtn gray sm" data-t="giDD">No .gitignore ▾</span>') +
      ddRow('Add license', 'Licenses explain how others can use your code.', '<span class="gbtn gray sm" data-t="licDD">No license ▾</span>') + '</div>' +
      '<div class="menu hidden" data-t="visMenu" style="right:10px;top:40px;min-width:320px">' +
      '<div data-t="vPub"><b>🌐 Public</b><div class="muted">Anyone on the internet can see this repository.</div></div>' +
      '<div data-t="vPriv"><b>🔒 Private</b><div class="muted">You choose who can see and commit to this repository.</div></div></div></div>' +
      '<div style="text-align:right;margin-top:8px"><span class="gbtn" data-t="createRepo">Create repository</span></div></div></div>', { tab: 'New repository' });
  }
  function ghEmptyRepo() {
    return win('github.com/' + USER + '/' + REPO, '<div class="gh">' + ghTop(repoCrumb(), true) +
      '<div style="width:760px;margin:14px auto">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px"><span class="av sm">홍</span><b style="font-size:19px">' + REPO + '</b><span class="pill line">Private</span><span class="gh-sp"></span><span class="gbtn gray sm">📌 Pin</span><span class="gbtn gray sm">👁 Watch 0 ▾</span></div>' +
      '<div class="tbl" data-t="setup" style="background:#ddf4ff;border-color:#54aeff66"><div style="padding:14px 18px"><b>Quick setup</b> — if you’ve done this kind of thing before' +
      '<div style="margin-top:10px;display:flex;gap:6px;align-items:center;font-size:12px"><span class="gbtn gray sm">🖥 Set up in Desktop</span><span>or</span><span class="gbtn gray sm">HTTPS</span><span class="gbtn gray sm">SSH</span>' +
      '<span style="flex:1;background:#fff;border:1px solid #d0d7de;border-radius:6px;padding:4px 10px;font-family:Consolas,monospace">https://github.com/' + USER + '/' + REPO + '.git</span></div>' +
      '<div style="margin-top:12px;font-size:13px">Get started by <a>creating a new file</a> or <a data-t="uploadLink" style="font-weight:600">uploading an existing file</a>. We recommend every repository include a README, LICENSE, and .gitignore.</div></div></div>' +
      '<div style="margin-top:16px;font-weight:600">…or create a new repository on the command line</div>' +
      '<div class="tbl" style="margin-top:6px;height:90px;background:#f6f8fa;font-family:Consolas,monospace;font-size:12px;padding:10px;color:#59636e">echo "# stock-journal" &gt;&gt; README.md<br>git init<br>git add README.md …</div>' +
      '<div style="margin-top:14px;font-weight:600">…or push an existing repository from the command line</div></div></div>', { tab: REPO });
  }
  function ghUpload(a) {
    var up = a.uploaded;
    var list = '<div class="tbl' + (up ? '' : ' hidden') + '" data-t="uplist" style="margin-top:8px">' +
      ['api/price.js', 'public/index.html', 'vercel.json'].map(function (f) { return '<div class="rowline" style="padding:3px 12px;font-size:12px">📄 ' + f + '<span class="gh-sp"></span><span class="muted">✕</span></div>'; }).join('') +
      '<div class="rowline" style="padding:3px 12px;font-size:12px;color:#59636e">… 외 13개 파일 (모두 16개)</div></div>';
    return miniExplorer(a.sel) + win('github.com/' + USER + '/' + REPO + '/upload/main', '<div class="gh">' + ghTop(repoCrumb(), true) +
      '<div style="padding:12px 20px">' +
      '<div style="font-size:13px;margin-bottom:8px"><a>' + REPO + '</a> /</div>' +
      '<div data-t="drop" style="border:2px dashed #d0d7de;border-radius:8px;padding:' + (up ? '6px' : '36px') + ' 10px;text-align:center;color:#59636e;background:#f6f8fa">' +
      (up ? '' : '<div style="font-size:30px">📄</div>') + '<b style="color:#1f2328">Drag additional files here to add them to your repository</b><div style="font-size:12px">Or <a>choose your files</a></div></div>' +
      list +
      '<div class="tbl" data-t="cbox" style="margin-top:10px"><div class="tbl-h"><b>Commit changes</b></div><div style="padding:8px 14px">' +
      '<div class="inp wide" data-t="cmsg">Add files via upload</div>' + (up ? '' : '<div class="inp wide" style="margin-top:6px;height:30px;color:#8c959f">Add an optional extended description…</div>') +
      '<div class="radio on sm"><span class="dot"></span><div>Commit directly to the <b>main</b> branch.</div></div>' +
      '<div class="radio sm"><span class="dot"></span><div>Create a <b>new branch</b> for this commit and start a pull request.</div></div>' +
      '<span class="gbtn" data-t="commit">Commit changes</span> <span class="gbtn gray">Cancel</span></div></div></div></div>', { cls: 'right', tab: 'Upload files · ' + REPO });
  }
  function ghRepo(a) {
    a = a || {};
    var rows = a.nested ? [['📁', 'stock-journal', 'r-nested']] :
      [['📁', 'api', 'r-api'], ['📁', 'public', 'r-public'], ['📄', 'README.md', 'r-readme'], ['⚙️', 'vercel.json', 'r-json']];
    return win('github.com/' + USER + '/' + REPO, '<div class="gh">' + ghTop(repoCrumb(), true) +
      '<div style="display:flex;gap:22px;padding:12px 22px">' +
      '<div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><span class="av sm">홍</span><b style="font-size:19px">' + REPO + '</b><span class="pill line">Private</span><span class="gh-sp"></span><span class="gbtn gray sm">👁 Watch 0 ▾</span><span class="gbtn gray sm">⑂ Fork 0</span><span class="gbtn gray sm">☆ Star 0</span></div>' +
      '<div style="display:flex;gap:8px;margin-bottom:10px;align-items:center"><span class="gbtn gray sm">⑂ main ▾</span><span class="muted">⑂ 1 Branch · 🏷 0 Tags</span><span class="gh-sp"></span><span class="inp" style="font-size:12px;color:#8c959f;padding:3px 10px;min-height:0">🔍 Go to file</span><span class="gbtn gray sm">Add file ▾</span><span class="gbtn sm">&lt;&gt; Code ▾</span></div>' +
      '<div class="tbl" data-t="files"><div class="tbl-h"><span class="av" style="width:20px;height:20px;font-size:10px">홍</span> <b>' + USER + '</b> Add files via upload <span class="gh-sp"></span><span class="muted">a1b2c3d · now &nbsp; 🕘 1 Commit</span></div>' +
      rows.map(function (r) { return '<div class="rowline" data-t="' + r[2] + '"><span>' + r[0] + '</span><span class="nm">' + r[1] + '</span><span class="msg">Add files via upload</span><span class="tm">now</span></div>'; }).join('') +
      '</div><div class="tbl" style="margin-top:12px"><div class="tbl-h">📖 README</div><div style="padding:10px 16px;font-weight:700;font-size:17px">' + (a.nested ? '<span class="muted">README가 하위 폴더 안에 있어요</span>' : '나의 주식매매일지 + 현재가 조회') + '</div></div></div>' +
      '<div style="width:200px;font-size:13px"><b>About</b><div class="muted" style="margin:8px 0">No description, website, or topics provided.</div><div class="muted">📖 Readme<br>☆ 0 stars<br>👁 0 watching<br>⑂ 0 forks</div>' +
      (a.deployed ? '<div style="margin-top:14px"><b>Deployments</b><div class="muted" style="margin-top:6px">🚀 Production · now</div></div>' : '') + '</div></div></div>', { tab: REPO });
  }
  function ghAuth() {
    return win('github.com/login/oauth/authorize?client_id=…', '<div class="gh" style="background:#f6f8fa">' +
      '<div style="width:460px;margin:30px auto;text-align:center"><div style="display:flex;justify-content:center;align-items:center;gap:14px"><span style="width:46px;height:46px;border-radius:10px;background:#000;display:inline-flex;align-items:center;justify-content:center"><span class="vc-logo w"></span></span><span style="color:#8c959f">⋯ ✓ ⋯</span><span class="gh-logo" style="width:46px;height:46px"></span></div>' +
      '<div style="font-size:22px;margin:12px 0 16px">Vercel by <a>Vercel</a></div>' +
      '<div class="tbl" style="text-align:left;background:#fff"><div style="padding:16px"><b>Vercel</b> by <a>vercel</a><div style="color:#59636e;font-size:13px">wants to access your <b>' + USER + '</b> account</div>' +
      '<div style="margin-top:12px;font-size:13px">👤 <b>Personal user data</b><br><span style="color:#59636e">Email addresses (read-only)</span></div></div>' +
      '<div style="padding:14px 16px;border-top:1px solid #d0d7de;display:flex;gap:10px"><span class="gbtn gray" style="flex:1;text-align:center">Cancel</span><span class="gbtn" data-t="authorize" style="flex:1;text-align:center">Authorize Vercel</span></div></div>' +
      '<div style="color:#59636e;font-size:12px;margin-top:10px">Authorizing will redirect to <b>https://vercel.com</b></div></div></div>', { tab: 'Authorize application' });
  }
  function ghInstall() {
    return win('github.com/apps/vercel/installations/new', '<div class="gh">' + ghTop('Install Vercel') +
      '<div style="width:620px;margin:18px auto"><div style="font-size:22px;margin-bottom:4px">Install & Authorize Vercel</div><div style="color:#59636e;font-size:13px;margin-bottom:12px">Install on your personal account <b>' + USER + '</b></div>' +
      '<div class="tbl" data-t="repoBox"><div style="padding:12px 16px">' +
      '<div><div class="radio on" data-t="all"><span class="dot"></span><div><b>All repositories</b><small>This applies to all current and future repositories owned by the resource owner.</small></div></div>' +
      '<div class="radio" data-t="only"><span class="dot"></span><div><b>Only select repositories</b><small>Select at least one repository.</small></div></div></div>' +
      '<div style="margin:4px 0 0 30px"><span class="gbtn gray" data-t="sel">Select repositories ▾</span>' +
      '<div class="hidden" data-t="chip" style="margin-top:8px;border:1px solid #d0d7de;border-radius:6px;padding:6px 10px;width:300px">🔒 ' + USER + '/' + REPO + ' <span style="float:right">✕</span></div></div></div>' +
      '<div style="padding:10px 16px;border-top:1px solid #d0d7de;font-size:13px;color:#59636e">with these permissions: ✓ Read access to metadata · ✓ Read and write access to code, deployments, pull requests…</div></div>' +
      '<div style="margin-top:14px"><span class="gbtn" data-t="install">Install & Authorize</span> <span class="gbtn gray">Cancel</span></div></div></div>', { tab: 'Install Vercel' });
  }
  var CODE = [
    [263, "// ── 버전 정보 ──"],
    [264, "<span class=\"kw\">var</span> APP_VER='<span data-t=\"ver\">v1.7</span>',APP_DATE='2026-11-09';"],
    [265, "<span class=\"kw\">var</span> MANUAL=["],
    [266, "  '📈 나의 주식매매일지 사용 설명서',"],
    [267, "  '자산현황: 종목코드로 현재가를 조회해요',"],
    [268, "  …"]
  ];
  function ghFile(a) {
    var edit = a.edit;
    return win('github.com/' + USER + '/' + REPO + '/' + (edit ? 'edit' : 'blob') + '/main/public/index.html', '<div class="gh">' + ghTop(repoCrumb(), true) +
      '<div style="padding:12px 22px"><div style="font-size:14px;margin-bottom:10px"><a>' + REPO + '</a> / <a>public</a> / <b>index.html</b>' + (edit ? ' <span class="muted">in main</span>' : '') + '</div>' +
      '<div class="tbl"><div class="tbl-h">' + (edit ? '<span class="seg"><b>Edit</b><span>Preview</span></span> <span class="gh-sp"></span><span class="gbtn gray">Cancel changes</span><span class="gbtn" data-t="commitBtn">Commit changes…</span>' :
        '<span class="seg"><b>Code</b><span>Blame</span></span> <span class="muted">775 lines (689 loc) · 86.2 KB</span><span class="gh-sp"></span><span class="gbtn gray sm">Raw</span><span class="gbtn gray sm">⧉</span><span class="gbtn gray sm">⬇</span><span class="gbtn gray sm" data-t="pencil">✏️</span><span class="gbtn gray sm">▾</span>') + '</div>' +
      '<div class="code" style="padding:8px 0;' + (edit ? 'background:#fff;outline:2px solid #0969da;outline-offset:-2px' : '') + '">' +
      CODE.map(function (l) { return '<div class="ln"' + (l[0] === 264 ? ' data-t="line"' : '') + '><span class="no">' + l[0] + '</span><span class="c">' + l[1] + '</span></div>'; }).join('') + '</div></div></div>' +
      '<div class="dlg hidden" data-t="cdlg"><div class="tbl" style="width:480px;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.25)"><div class="tbl-h"><b>Commit changes</b><span class="gh-sp"></span>✕</div><div style="padding:14px 16px">' +
      '<div class="field"><label>Commit message</label><div class="inp wide">Update index.html</div></div>' +
      '<div class="field"><label>Extended description</label><div class="inp wide" style="height:40px;color:#8c959f">Add an optional extended description..</div></div>' +
      '<div class="radio on sm"><span class="dot"></span><div>Commit directly to the <b>main</b> branch</div></div>' +
      '<div class="radio sm"><span class="dot"></span><div>Create a new branch for this commit and start a pull request</div></div>' +
      '<div style="text-align:right;margin-top:8px"><span class="gbtn gray">Cancel</span> <span class="gbtn" data-t="cconf">Commit changes</span></div></div></div></div></div>', { tab: REPO + '/public/index.html' });
  }

  /* ---------- Vercel ---------- */
  function vcTop(proj) {
    return '<div class="vc-top"><span class="vc-logo"></span><span class="vc-slash">/</span>' +
      '<span class="vc-team" data-t="teamSw"><span class="tav">h</span>' + TEAM + ' <span class="vc-plan">Hobby</span> <span class="muted">▾</span></span>' +
      (proj ? '<span class="vc-slash">/</span><span class="vc-team"><span style="font-size:13px">◫</span> ' + REPO + ' <span class="muted">▾</span></span>' : '') +
      '<span class="gh-sp"></span><span class="vc-r"><span class="vbtn line sm">Feedback</span><span>🔔</span><span>Docs</span><span class="av" style="width:26px;height:26px;background:linear-gradient(135deg,#7c3aed,#ec4899)">홍</span></span></div>';
  }
  var TEAM_NAV = [['Projects', 'side-projects', '▦'], ['Deployments', 'side-tdeploys', '🚀'], ['Logs', 'side-tlogs', '☰'], ['Observability', 'side-obs', '📈'],
    ['Domains', 'side-domains', '🌐'], ['Integrations', 'side-int', '🧩'], ['Storage', 'side-storage', '🗄'], ['AI Gateway', 'side-ai', '✦'], ['Usage', 'side-usage', '📊'], ['Settings', 'side-tset', '⚙']];
  function teamSide(on) { return '<div class="vc-side"><div class="vc-search">🔍 Find…</div>' + nav(TEAM_NAV, on) + '</div>'; }
  var PROJ_NAV = [['Overview', 'side-ov', '◉'], ['Deployments', 'side-deploys', '🚀'], ['Logs', 'side-logs', '☰'], ['Analytics', 'side-ana', '📊'], ['Speed Insights', 'side-speed', '⚡'],
    ['Observability', 'side-pobs', '📈'], ['Firewall', 'side-fw', '🛡'], ['Storage', 'side-pstore', '🗄'], ['Flags', 'side-flags', '⚑'], ['AI Gateway', 'side-pai', '✦'], ['Settings', 'side-set', '⚙']];
  function projSide(on) { return '<div class="vc-side"><div class="vc-sh" data-t="projHead">← ' + TEAM + '</div>' + nav(PROJ_NAV, on) + '</div>'; }
  var SET_NAV = [['General', 'sub-general'], ['Build and Deployment', 'sub-build'], ['Domains', 'sub-domains'], ['Environment Variables', 'envNav'], ['Git', 'sub-git'],
    ['Integrations', 'sub-int'], ['Deployment Protection', 'sub-protect'], ['Functions', 'sub-fn'], ['Security', 'sub-sec'], ['Advanced', 'sub-adv']];
  function setSub(on) { return '<div class="vc-sub" data-t="setsub"><div class="sub-h">Settings</div>' + nav(SET_NAV, on) + '</div>'; }
  function pvc(path, body, tab, proj) { return win('vercel.com/' + USER + 's-projects' + path, '<div class="vc">' + vcTop(proj) + body + '</div>', { tab: tab + ' – Vercel' }); }

  function vcSignup(a) {
    var plan = a.step !== 'provider';
    var left = '<div style="width:420px;margin:26px auto 0;text-align:left">' +
      '<div style="font-size:26px;font-weight:700;letter-spacing:-.5px;margin-bottom:18px">' + (plan ? 'Let’s get started' : 'Let’s create your account') + '</div>';
    if (plan) {
      left += '<div class="lb" style="margin-bottom:8px">Plan Type</div>' +
        '<div data-t="planHobby" class="vcard" style="padding:12px 14px;margin-bottom:8px;border-color:#171717;display:flex;gap:10px;align-items:center"><span class="radio on sm" style="padding:0"><span class="dot"></span></span><div><b>I’m working on personal projects</b> <span class="vtag">Hobby</span></div></div>' +
        '<div data-t="planPro" class="vcard" style="padding:12px 14px;margin-bottom:14px;display:flex;gap:10px;align-items:center"><span class="radio sm" style="padding:0"><span class="dot"></span></span><div><b>I’m working on commercial projects</b> <span class="vtag">Pro</span></div></div>' +
        '<div class="lb">Your Name</div><div class="inp wide" data-t="vName" style="margin-bottom:14px"></div>' +
        '<div class="vbtn" data-t="vCont" style="display:block;text-align:center;padding:10px">Continue</div>' +
        '<div class="muted" style="margin-top:12px;text-align:center">By joining, you agree to our Terms of Service and Privacy Policy</div>';
    } else {
      left += '<div class="vbtn" data-t="vGh" style="display:flex;justify-content:center;align-items:center;gap:8px;padding:11px;margin-bottom:10px"><span class="gh-logo inv" style="width:18px;height:18px"></span> Continue with GitHub</div>' +
        '<div class="vbtn" style="display:block;text-align:center;padding:11px;margin-bottom:10px;background:#6b4fbb;border-color:#6b4fbb">🦊 Continue with GitLab</div>' +
        '<div class="vbtn" style="display:block;text-align:center;padding:11px;margin-bottom:10px;background:#0052cc;border-color:#0052cc">🪣 Continue with Bitbucket</div>' +
        '<div style="text-align:center;margin-top:10px"><a>Continue with Email →</a></div>' +
        '<div style="text-align:center;margin-top:14px" class="muted">← Back</div>';
    }
    return win('vercel.com/signup', '<div class="vc" style="background:#fff"><div class="vc-top" style="border:0"><span class="vc-logo"></span><b style="font-size:16px">Vercel</b><span class="gh-sp"></span><span class="muted">Already have an account? <a>Log In</a></span></div>' + left + '</div></div>', { tab: 'Sign Up – Vercel' });
  }
  function vcHome(a) {
    var has = a && a.has;
    return pvc('', teamSide('Projects') +
      '<div class="vc-main"><div style="display:flex;align-items:center;gap:10px;margin-bottom:14px"><span class="inp" style="flex:1;color:#8f8f8f;font-size:13px">🔍 Search Projects…</span><span class="vbtn line">▦ ☰</span><span class="vbtn" data-t="addNew">Add New… ▾</span></div>' +
      '<div class="menu hidden" data-t="addMenu" style="right:26px;top:58px;min-width:200px">' +
      '<div data-t="mProj" class="em">◫ Project</div><div data-t="mDomain">🌐 Domain</div><div data-t="mStore">🗄 Store</div><div data-t="mTeam">👥 Team</div></div>' +
      (has ? '<div class="vcard" style="width:340px"><div style="display:flex;gap:10px;align-items:center"><span class="tav" style="background:#000">◫</span><div><b>' + REPO + '</b><div class="muted">' + URL1 + '</div></div></div><div class="muted" style="margin-top:12px">⑂ ' + USER + '/' + REPO + '</div><div class="muted">Update index.html · Today on main</div></div>' :
        '<div class="vcard" style="padding:26px"><div style="text-align:center"><div style="font-size:30px">◫</div><h4 style="font-size:18px">Deploy your first project</h4><div class="muted" style="margin-bottom:16px">첫 프로젝트를 올리는 방법</div></div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">' +
        '<div class="vcard" data-t="cImport" style="margin:0;text-align:center"><div style="font-size:24px">⑂</div><b>Import Git Repository</b><div class="muted">GitHub 저장소와 연결 · 자동 배포</div></div>' +
        '<div class="vcard" data-t="cTpl" style="margin:0;text-align:center"><div style="font-size:24px">▤</div><b>Clone Template</b><div class="muted">Next.js 등 견본으로 시작</div></div></div></div>') +
      '<div class="vcard" data-t="usageMini" style="width:340px"><h4>Usage <span class="muted" style="font-weight:400">· Last 30 days</span></h4><div class="muted" style="line-height:1.8">Fast Data Transfer &nbsp; 0 / 100 GB<br>CDN Requests &nbsp; 0 / 1M<br>Function Invocations &nbsp; 0 / 1M</div></div></div>', 'Dashboard');
  }
  function vcNew(a) {
    var st = a.state || 'noapp';
    var body;
    if (st === 'noapp') {
      body = '<div style="text-align:center;padding:30px 10px"><div style="font-size:30px">⑂</div><b>Import Git Repository</b><div class="muted" style="margin:6px 0 16px">Select a Git provider to import an existing project from a Git Repository.</div>' +
        '<div class="vbtn" data-t="impGh" style="display:block;margin:0 20px 8px">Continue with GitHub</div><div class="vbtn" style="display:block;margin:0 20px 8px;background:#6b4fbb;border-color:#6b4fbb">Continue with GitLab</div><div class="vbtn" style="display:block;margin:0 20px;background:#0052cc;border-color:#0052cc">Continue with Bitbucket</div></div>';
    } else {
      body = '<div style="display:flex;gap:8px;margin-bottom:10px"><span class="inp">🟣 ' + USER + ' ▾</span><span class="inp" style="flex:1;color:#8f8f8f">🔍 Search…</span></div>' +
        (st === 'empty' ? '<div class="vrow" data-t="noRepo" style="border:1px dashed #d4d4d4;border-radius:8px;justify-content:center;color:#8f8f8f;padding:20px">No Git Repositories found</div>' :
          '<div class="vcard" style="padding:0;margin:0"><div class="vrow" data-t="pickRow"><span class="gh-logo" style="width:20px;height:20px"></span><b>' + REPO + '</b> <span class="muted">🔒 · now</span><span class="gh-sp"></span><span class="vbtn sm" data-t="pickRepo">Import</span></div></div>') +
        '<div class="muted" style="margin-top:14px;font-size:13px" data-t="cfgLink">Missing Git repository? <a>Adjust GitHub App Permissions →</a></div>';
    }
    return win('vercel.com/new', '<div class="vc" style="background:#fff">' + vcTop() +
      '<div class="vc-main full" style="padding:20px 40px"><div style="font-size:28px;font-weight:700;letter-spacing:-.5px">Let’s build something new</div><div class="muted" style="font-size:14px;margin-bottom:16px">To deploy a new Project, import an existing Git Repository or get started with one of our Templates.</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px"><div class="vcard" data-t="impBox"><h4>Import Git Repository</h4>' + body + '</div>' +
      '<div class="vcard"><h4>Clone Template</h4><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px">' +
      ['Next.js Boilerplate', 'AI Chatbot', 'Commerce', 'Vite + React'].map(function (t) { return '<div style="border:1px solid #ebebeb;border-radius:8px;height:86px;background:#f5f5f5;display:flex;align-items:flex-end;padding:6px 8px;font-size:12px;font-weight:600">' + t + '</div>'; }).join('') +
      '</div><div class="muted" style="margin-top:10px">Browse All Templates →</div></div></div></div></div>', { tab: 'New Project – Vercel' });
  }
  function vcConfig(a) {
    var open = a.open;
    var fld = function (label, val, t, note, extra) { return '<div class="field sm" data-t="' + t + '"' + (open ? ' style="margin-bottom:3px"' : '') + '><label>' + label + '</label><div class="inp wide" style="display:flex;align-items:center">' + val + (extra || '') + '</div>' + (note && !open ? '<div class="muted">' + note + '</div>' : '') + '</div>'; };
    var ov = function (label, ph, t) { return '<div data-t="' + t + '" style="display:grid;grid-template-columns:140px 1fr 70px;gap:8px;align-items:center;margin-top:' + (open ? 4 : 8) + 'px;font-size:13px"><b>' + label + '</b><div class="inp" style="min-height:24px;padding:1px 10px;color:#a1a1a1">' + ph + '</div><span class="muted">Override <span class="vtgl"></span></span></div>'; };
    return win('vercel.com/new/import?s=https://github.com/' + USER + '/' + REPO, '<div class="vc" style="background:#fafafa">' + vcTop() +
      '<div class="vc-main full" style="padding:' + (open ? '6px' : '14px') + ' 0"><div style="width:640px;margin:0 auto">' +
      '<div style="font-size:' + (open ? 19 : 24) + 'px;font-weight:700;letter-spacing:-.4px">New Project</div>' +
      '<div class="vcard" style="margin-top:' + (open ? 4 : 8) + 'px;padding:' + (open ? '8px 18px' : '14px 18px') + '">' +
      '<div class="muted" data-t="importFrom" style="background:#f5f5f5;border-radius:6px;padding:' + (open ? '3px' : '6px') + ' 10px;margin-bottom:' + (open ? 5 : 10) + 'px;font-size:12.5px">Importing from GitHub &nbsp; <b style="color:#171717">⑂ ' + USER + '/' + REPO + '</b> &nbsp; ⑂ main</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 14px">' +
      fld('Vercel Team', '<span class="tav" style="width:16px;height:16px;font-size:8px;margin-right:6px;background:linear-gradient(135deg,#7c3aed,#ec4899)">h</span>' + TEAM + ' <span class="vtag" style="margin-left:6px">Hobby</span>', 'team', '', '<span class="gh-sp"></span>▾') +
      fld('Project Name', REPO, 'projName', '') + '</div>' +
      fld('Framework Preset', '<b style="margin-right:6px">⬡</b> Other', 'preset', '프레임워크 없이 만든 HTML 앱이면 Other', '<span class="gh-sp"></span>▾') +
      fld('Root Directory', './', 'root', '비워 두면(./) 저장소 맨 위', '<span class="gh-sp"></span><span class="vbtn line sm">Edit</span>') +
      '<div class="vsec" data-t="bos"' + (open ? ' style="margin-top:4px"' : '') + '><div class="h"' + (open ? ' style="padding:5px 14px"' : '') + '>' + (open ? '▾' : '›') + ' Build and Output Settings</div>' + (open ? '<div class="b" style="padding:2px 14px 6px">' +
        ov('Build Command', '`npm run vercel-build` or `npm run build`', 'bCmd') + ov('Output Directory', '`public` if it exists, or `.`', 'oDir') + ov('Install Command', '`yarn install`, `npm install`, …', 'iCmd') + '</div>' : '') + '</div>' +
      '<div class="vsec" data-t="envSec"' + (open ? ' style="margin-top:4px"' : '') + '><div class="h"' + (open ? ' style="padding:5px 14px"' : '') + '>› Environment Variables</div></div>' +
      '<div class="vbtn" data-t="deploy" style="display:block;text-align:center;padding:' + (open ? 7 : 10) + 'px;margin-top:' + (open ? 6 : 12) + 'px;font-size:14px">Deploy</div></div></div></div></div>', { tab: 'New Project – Vercel' });
  }
  function vcDeploying(a) {
    var done = a.state === 'done';
    if (done) {
      return win('vercel.com/new/' + USER + 's-projects/success?…', '<div class="vc" style="background:#fff">' + vcTop() +
        '<div class="confetti">🎉✨🎊⭐🎉✨🎊⭐🎉✨🎊⭐🎉✨🎊⭐🎉✨🎊⭐🎉✨🎊⭐</div>' +
        '<div class="vc-main full" style="padding:22px 0"><div style="width:720px;margin:0 auto"><div data-t="congrats" style="font-size:30px;font-weight:800;letter-spacing:-.6px">Congratulations!</div>' +
        '<div class="muted" style="font-size:14px;margin-bottom:16px">You just deployed a new Project to Vercel.</div>' +
        '<div class="vcard" style="display:flex;gap:18px;align-items:center"><div class="vthumb" data-t="thumb">📈<small>나의 주식매매일지</small></div>' +
        '<div><div class="muted">Deployment</div><a style="font-weight:600">' + REPO + '-git-main-…vercel.app</a><div class="muted" style="margin-top:8px">Domains</div><a data-t="url" style="font-weight:600">' + URL0 + '</a>' +
        '<div style="margin-top:12px"><span class="dot ok"></span>Ready · 21s</div></div></div>' +
        '<div style="display:flex;gap:10px"><span class="vbtn" data-t="toDash" style="flex:1;text-align:center;padding:10px">Continue to Dashboard</span></div></div></div></div>', { tab: 'Congratulations – Vercel' });
    }
    return win('vercel.com/new/' + USER + 's-projects/deploy?…', '<div class="vc" style="background:#fff">' + vcTop() +
      '<div class="vc-main full" style="padding:22px 0"><div style="width:720px;margin:0 auto"><div style="font-size:24px;font-weight:700">Deploying…</div><div class="muted" style="margin-bottom:12px">Please follow the steps to configure your Project and deploy it.</div>' +
      '<div class="vcard"><div style="display:flex;align-items:center;gap:8px" data-t="status"><span class="dot run"></span><b>Building</b><span class="gh-sp"></span><span class="muted">14s</span></div>' +
      '<div class="vlog" data-t="log" style="margin-top:10px">' +
      '<span class="g">14:31:02.104</span> Running build in Washington, D.C., USA (East) – iad1<br>' +
      '<span class="g">14:31:02.311</span> Cloning github.com/' + USER + '/' + REPO + ' (Branch: main, Commit: a1b2c3d)<br>' +
      '<span class="g">14:31:03.020</span> Cloning completed: 709ms<br>' +
      '<span class="g">14:31:04.512</span> Build Completed in /vercel/output [1s]<br>' +
      '<span class="g">14:31:05.233</span> Deploying outputs… (functions: api/alerts, api/market, api/price, api/risk)</div></div></div></div></div>', { tab: 'Deploying – Vercel' });
  }
  function vcOverview(a) {
    var url = a.renamed ? URL1 : URL0;
    var rb = a.rolledback;
    return pvc('/' + REPO, projSide('Overview') +
      '<div class="vc-main"><div style="display:flex;align-items:center;gap:8px;margin-bottom:12px"><h3 style="margin:0">' + REPO + '</h3><span class="gh-sp"></span><span class="vbtn line">⑂ Repository</span><span class="vbtn line" data-t="usageBtn">Usage</span><span class="vbtn line">Domains</span><span class="vbtn" data-t="visit">Visit ▾</span></div>' +
      '<div class="vcard" data-t="prodTile"><div style="display:flex;align-items:center;margin-bottom:10px"><b>Production Deployment</b><span class="gh-sp"></span>' +
      (rb ? '<span class="vbtn line sm" data-t="manage">Manage</span> ' : '') + '<span class="vbtn line sm" data-t="buildLogs">Build Logs</span> <span class="vbtn line sm" data-t="runLogs">Runtime Logs</span> <span class="vbtn line sm" data-t="rollBtn">↺ Instant Rollback</span></div>' +
      '<div style="display:flex;gap:18px"><div class="vthumb" style="width:230px;height:140px">📈<small>나의 주식매매일지</small></div><div class="vkv" style="flex:1;align-content:start">' +
      '<span>Deployment</span><a>' + REPO + '-7f3k2…vercel.app</a>' +
      '<span>Domains</span><span><a data-t="url" style="font-weight:600">' + url + '</a>' + (a.renamed ? '' : ' <span class="muted">+1</span>') + '</span>' +
      '<span>Status</span><span data-t="status"><span class="dot ok"></span>Ready' + (rb ? ' <span class="vtag" style="margin-left:6px;color:#b45309;border-color:#fde68a;background:#fffbeb">Rolled back</span>' : '') + '</span>' +
      '<span>Created</span><span>' + (rb ? 'Today 2:31 PM by hong-trader' : 'just now by hong-trader') + '</span>' +
      '<span>Source</span><span>⑂ main &nbsp; <span class="muted">' + (rb ? 'a1b2c3d Add files via upload' : (a.updated ? 'e4f5a6b Update index.html' : 'a1b2c3d Add files via upload')) + '</span></span></div></div>' +
      '<div class="ft">' + (rb ? '⚠️ Auto-assignment of production domains is <b>off</b>. 새 커밋이 자동으로 공개되지 않아요.' : 'To update your Production Deployment, push to the <b>main</b> branch.') + '</div></div>' +
      '<div class="vcard"><h4>Preview Deployments</h4><div class="muted">main이 아닌 브랜치에 저장하면 미리보기 배포가 여기에 생겨요.</div></div></div>', 'stock-journal – Overview', true);
  }
  function vcSettingsGeneral(a) {
    return pvc('/' + REPO + '/settings', projSide('Settings') + setSub('General') +
      '<div class="vc-main withsub"><h3>General</h3>' +
      '<div class="vcard" data-t="pnameCard"><h4>Project Name</h4><div class="muted" style="margin-bottom:8px">Used to identify your Project on the Dashboard, Vercel CLI, and in the URL of your Deployments.</div>' +
      '<div class="inp" style="width:340px">vercel.com/hong-traders-projects/<b>' + REPO + '</b></div><div class="ft"><span class="gh-sp"></span><span class="vbtn sm">Save</span></div></div>' +
      '<div class="vcard"><h4>Project ID</h4><div class="muted">prj_4f1c…9b2e</div></div>' +
      '<div class="vcard"><h4>Node.js Version</h4><div class="muted">24.x</div></div>' +
      '<div class="vcard" style="border-color:#fecaca"><h4 style="color:#b91c1c">Delete Project</h4><div class="muted">이 프로젝트와 모든 배포를 지워요. 되돌릴 수 없어요.</div></div></div>', 'General – Settings', true);
  }
  function vcDomains(a) {
    var name = a.renamed ? URL1 : URL0;
    return pvc('/' + REPO + '/settings/domains', projSide('Settings') + setSub('Domains') +
      '<div class="vc-main withsub"><div style="display:flex;align-items:center;margin-bottom:6px"><h3 style="margin:0">Domains</h3><span class="gh-sp"></span><span class="vbtn line" style="margin-right:6px" data-t="buyDom">Buy</span><span class="vbtn" data-t="addDom">Add Domain</span></div>' +
      '<div class="muted" style="margin-bottom:12px">These domains are assigned to your Production Deployments.</div>' +
      '<div class="vcard" data-t="domRow" style="padding:0"><div class="vrow"><span class="dot ok"></span><b data-t="domName">' + name + '</b><span class="vtag prod">Production</span><span class="gh-sp"></span><span class="muted" style="margin-right:6px">Valid Configuration</span><span class="vbtn line sm" data-t="editDom">Edit</span></div></div>' +
      (a.renamed ? '' : '<div class="vcard" style="padding:0"><div class="vrow"><span class="dot ok"></span><b>' + REPO + '-hong-traders-projects.vercel.app</b><span class="gh-sp"></span><span class="muted">자동 생성 주소</span></div></div>') +
      '<div class="vcard hidden" data-t="addForm"><h4>Add Domain</h4><div class="inp wide" style="color:#a1a1a1">example.com</div><div class="muted" style="margin-top:6px">이미 산 도메인을 입력하면, 도메인 회사에서 바꿀 DNS 값(A / CNAME)을 안내해 줘요.</div><div class="ft"><span class="gh-sp"></span><span class="vbtn line sm">Cancel</span><span class="vbtn sm">Save</span></div></div>' +
      '<div class="vcard" data-t="https"><h4>🔒 SSL Certificates</h4><div class="muted">HTTPS 인증서는 Vercel이 자동으로 발급하고 갱신해요.</div></div>' +
      '<div class="dlg hidden" data-t="dlg"><div class="vcard" style="width:460px;box-shadow:0 10px 30px rgba(0,0,0,.25)"><h4>Edit Domain</h4><div class="muted" style="margin-bottom:10px">.vercel.app 앞부분은 아직 아무도 쓰지 않는 이름이면 무료로 바꿀 수 있어요.</div>' +
      '<div style="display:flex;align-items:center;gap:4px"><div class="inp" data-t="nameInp" style="flex:1">stock-journal-a1b2c3</div><span class="muted">.vercel.app</span></div>' +
      '<div class="ft"><span class="gh-sp"></span><span class="vbtn line sm">Cancel</span><span class="vbtn sm" data-t="saveName">Save</span></div></div></div></div>', 'Domains – Settings', true);
  }
  function vcBuildSettings(a) {
    var ed = a.edit;
    var row = function (l, v, t, note) { return '<div style="display:grid;grid-template-columns:160px 1fr 80px;gap:8px;align-items:center;margin-top:8px;font-size:13px"><b>' + l + '</b><div class="inp" ' + (t ? 'data-t="' + t + '"' : '') + ' style="min-height:28px;padding:3px 10px;' + (v ? '' : 'color:#a1a1a1') + '">' + (v || note) + '</div><span class="muted">Override <span class="vtgl"></span></span></div>'; };
    return pvc('/' + REPO + '/settings/build-and-deployment', projSide('Settings') + setSub('Build and Deployment') +
      '<div class="vc-main withsub"><h3>Build and Deployment</h3>' +
      '<div class="vcard" data-t="fwCard"><h4>Framework Settings</h4><div class="muted">Framework Preset: <b style="color:#171717">Other</b></div>' + row('Build Command', '', '', '`npm run vercel-build` or `npm run build`') + row('Output Directory', '', '', '`public` if it exists, or `.`') + row('Install Command', '', '', '`npm install`') + '</div>' +
      '<div class="vcard" data-t="rootCard"><h4>Root Directory</h4><div class="muted" style="margin-bottom:8px">The directory within your project, in which your code is located.</div>' +
      '<div style="display:flex;align-items:center;gap:4px"><span class="muted">' + REPO + ' /</span><div class="inp" data-t="rootInp" style="width:260px;min-height:28px;padding:3px 10px">' + (ed ? '' : '') + '</div></div>' +
      '<div class="ft"><span class="gh-sp"></span><span class="vbtn sm" data-t="rootSave">Save</span></div></div>' +
      '<div class="vcard"><h4>Node.js Version</h4><div class="muted">24.x</div></div></div>', 'Build and Deployment – Settings', true);
  }
  function vcEnv() {
    return pvc('/' + REPO + '/settings/environment-variables', projSide('Settings') + setSub('Environment Variables') +
      '<div class="vc-main withsub"><h3>Environment Variables</h3><div class="muted" style="margin:-6px 0 12px">In order to provide your Deployment with Environment Variables at Build and Runtime, you may enter them right here.</div>' +
      '<div class="vcard" data-t="envForm" style="padding:14px 18px">' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div><label class="lb">Key</label><div class="inp wide" data-t="key"></div></div><div><label class="lb">Value</label><div class="inp wide" data-t="val"></div></div></div>' +
      '<div style="display:flex;gap:16px;align-items:center;margin-top:10px;font-size:13px" data-t="envs"><b>Environments</b><span class="inp" style="min-height:26px;padding:2px 10px">All Environments ▾</span><span class="muted"><span class="vchk on">✓</span>Production <span class="vchk on">✓</span>Preview <span class="vchk on">✓</span>Development</span></div>' +
      '<div class="ft"><span class="muted">＋ Add Another · Import .env</span><span class="gh-sp"></span><span class="vbtn sm" data-t="saveVar">Save</span></div></div>' +
      '<div class="vcard" style="padding:0"><div class="vrow muted" style="font-weight:600">Name<span class="gh-sp"></span>Environments</div>' +
      '<div class="vrow hidden" data-t="varRow"><b style="font-family:Consolas,monospace">ACCESS_CODE</b><span class="muted">••••••••••</span><span class="gh-sp"></span><span class="muted">All Environments · Added just now</span><span class="muted">⋯</span></div>' +
      '<div class="vrow muted" data-t="varEmpty">No Environment Variables Added</div></div>' +
      '<div class="vcard hidden" data-t="toast" style="background:#0a0a0a;color:#fff;width:420px;position:absolute;right:26px;bottom:20px;font-size:13px">✓ Added Environment Variable successfully. <b>A new deployment is needed for changes to take effect.</b> <span class="vbtn line sm" data-t="toastRedeploy" style="margin-left:6px">Redeploy</span></div></div>', 'Environment Variables – Settings', true);
  }
  function vcDeployments(a) {
    var rows = [];
    if (a.history) {
      rows.push(['newRow', 'ok', 'e4f5a6b · Update index.html', '3m ago', true]);
      rows.push(['midRow', 'ok0', 'c3d4e5f · Redeploy of 7f3k2', '20m ago', false]);
      rows.push(['oldRow', 'ok0', 'a1b2c3d · Add files via upload', '37m ago', false]);
    } else {
      rows.push(['newRow', a.auto ? 'run' : 'hide', a.auto ? 'e4f5a6b · Update index.html' : 'a1b2c3d · Redeploy of 7f3k2', 'just now', true]);
      rows.push(['oldRow', 'ok', 'a1b2c3d · Add files via upload', '18m ago', !a.auto && false || !a.auto]);
    }
    var st = function (k) { return k === 'run' ? '<span class="dot run"></span>Building' : '<span class="dot ok"></span>Ready'; };
    return pvc('/' + REPO + '/deployments', projSide('Deployments') +
      '<div class="vc-main"><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><h3 style="margin:0">Deployments</h3><span class="gh-sp"></span></div>' +
      '<div class="muted" style="margin-bottom:10px">⑂ Continuously generated from <b style="color:#171717">' + USER + '/' + REPO + '</b></div>' +
      '<div style="display:flex;gap:8px;margin-bottom:10px" data-t="depFilter"><span class="inp" style="flex:1;color:#8f8f8f;font-size:13px">🔍 All Branches…</span><span class="vbtn line sm">All Environments ▾</span><span class="vbtn line sm">Status 5/6 ▾</span></div>' +
      '<div class="vcard" style="padding:0;position:relative" data-t="depList">' +
      rows.map(function (r, i) {
        return '<div class="vrow' + (r[1] === 'hide' ? ' hidden' : '') + '" data-t="' + r[0] + '"><b style="width:110px;font-family:Consolas,monospace;font-size:12px">' + ['7f3k2', 'q9w8e', 'a1b2c'][i] + '…</b>' +
          '<span style="width:150px"><span class="vtag prod">Production</span>' + (r[4] && r[1] !== 'hide' && r[1] !== 'run' ? ' <span class="vtag cur">Current</span>' : '') + '</span>' +
          '<span style="width:100px" data-t="' + r[0] + 'St">' + st(r[1]) + '</span><span class="msg">⑂ main &nbsp; ' + r[2] + '</span><span class="tm">' + r[3] + ' by hong-trader</span>' +
          '<span class="vbtn line sm" data-t="' + r[0] + 'Dots" style="padding:2px 8px">⋯</span></div>';
      }).join('') + '</div>' +
      '<div class="menu hidden" data-t="dotMenu" style="right:43px;top:172px;min-width:220px"><div>Inspect Deployment</div><div>Copy URL</div><hr><div data-t="mRedeploy" class="em">Redeploy</div><div data-t="mPromote">Promote</div><div data-t="mRollback">Instant Rollback</div></div>' +
      '<div class="dlg hidden" data-t="rdDlg"><div class="vcard" style="width:470px;box-shadow:0 10px 30px rgba(0,0,0,.25)"><h4>Redeploy to Production</h4><div class="muted" style="margin-bottom:10px">You are about to create a new Deployment with the same source code as your current Deployment, but with the newest configuration from your Project Settings.</div>' +
      '<div class="vrow" style="border:1px solid #ebebeb;border-radius:8px"><span class="dot ok"></span>7f3k2… <span class="msg">⑂ main · Add files via upload</span></div>' +
      '<div style="margin-top:10px;font-size:13px" data-t="cacheChk"><span class="vchk on">✓</span>Use existing Build Cache</div>' +
      '<div class="ft"><span class="gh-sp"></span><span class="vbtn line sm">Cancel</span><span class="vbtn sm" data-t="rdGo">Redeploy</span></div></div></div></div>', 'Deployments', true);
  }
  function vcDeployDetail(a) {
    var failed = a.failed;
    var log = failed ?
      '<span class="g">14:31:02.104</span> Running build in Washington, D.C., USA (East) – iad1<br><span class="g">14:31:02.311</span> Cloning github.com/' + USER + '/' + REPO + ' (Branch: main, Commit: a1b2c3d)<br><span class="g">14:31:03.020</span> Cloning completed: 709ms<br>' +
      '<span class="err" data-t="errLine">14:31:04.112 Error: No Output Directory named "dist" found after the Build completed. Configure the Output Directory in your Project Settings.</span>' :
      '<span class="g">15:05:01.044</span> Cloning github.com/' + USER + '/' + REPO + ' (Branch: main, Commit: e4f5a6b)<br><span class="g">15:05:02.402</span> Build Completed in /vercel/output [1s]<br><span class="ok">15:05:06.551 Deployment completed</span>';
    return pvc('/' + REPO + '/7f3k2…', projSide('Deployments') +
      '<div class="vc-main" style="padding-top:14px"><div class="muted" style="margin-bottom:6px">Deployments / ' + (failed ? 'q9w8e…' : '7f3k2…') + '</div>' +
      '<div class="vcard" data-t="dHead" style="padding:10px 16px;margin-bottom:6px"><div style="display:flex;align-items:center;gap:10px"><b style="font-size:17px">Deployment Details</b><span class="gh-sp"></span>' +
      (failed ? '<span class="vbtn line sm" data-t="redeployBtn">Redeploy</span>' : '<span class="vbtn line sm">Runtime Logs</span><span class="vbtn sm" data-t="visitBtn">Visit</span>') + '<span class="vbtn line sm">⋯</span></div>' +
      '<div class="vkv" style="margin-top:10px"><span>Status</span><span data-t="dStatus">' + (failed ? '<span class="dot err"></span>Error' : '<span class="dot ok"></span>Ready <span class="vtag prod">Production</span> <span class="vtag cur">Current</span>') + '</span>' +
      '<span>Domains</span><span>' + (failed ? '—' : '<a>' + URL1 + '</a>') + '</span><span>Source</span><span>⑂ main &nbsp; ' + (failed ? 'a1b2c3d Change output settings' : 'e4f5a6b Update index.html') + '</span><span>Duration</span><span>' + (failed ? '3s' : '6s') + '</span></div></div>' +
      '<div class="vsec" data-t="dlog" style="margin-bottom:8px"><div class="h">▾ Build Logs <span class="gh-sp"></span><span class="muted">' + (failed ? '1 error' : '5 lines') + '</span></div><div class="b" style="padding-top:10px"><div class="vlog">' + log + '</div></div></div>' +
      (failed ? '' : '<div class="vsec" data-t="dsum"><div class="h">▾ Deployment Summary</div><div class="b muted" style="padding-top:8px;line-height:1.8">◫ Static Assets: 8 files (public) &nbsp; ƒ Functions: 4 (api/alerts, api/market, api/price, api/risk)</div></div>' +
        '<div class="vsec" data-t="dsrc"><div class="h">› Source &nbsp; <span class="muted" style="font-weight:400">· 배포된 파일 둘러보기 (Output 탭)</span></div></div>') + '</div>', 'Deployment Details', true);
  }
  function vcRollback(a) {
    return pvc('/' + REPO, projSide('Overview') +
      '<div class="vc-main"><h3>' + REPO + '</h3><div class="vcard" style="opacity:.5;height:200px"></div>' +
      '<div class="dlg"><div class="vcard" style="width:520px;box-shadow:0 10px 30px rgba(0,0,0,.25)"><h4>Instant Rollback</h4><div class="muted" style="margin-bottom:10px">Hobby 요금제는 <b>바로 이전</b> Production 배포로만 되돌릴 수 있어요.</div>' +
      '<div class="muted">Current</div><div class="vrow" style="border:1px solid #ebebeb;border-radius:8px;margin-bottom:8px"><span class="dot ok"></span>7f3k2… <span class="msg">⑂ main · e4f5a6b Update index.html</span></div>' +
      '<div class="muted">Roll back to</div><div class="vrow" data-t="rbTarget" style="border:2px solid #171717;border-radius:8px"><span class="dot gray"></span>q9w8e… <span class="msg">⑂ main · c3d4e5f Redeploy · 20m ago</span></div>' +
      '<div class="ft"><span class="gh-sp"></span><span class="vbtn line sm">Cancel</span><span class="vbtn sm" data-t="rbGo">Continue</span></div></div></div></div>', 'stock-journal – Overview', true);
  }
  function vcLogs(a) {
    return pvc('/' + REPO + '/logs', projSide('Logs') +
      '<div class="vc-main"><div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><h3 style="margin:0">Logs</h3><span class="gh-sp"></span><span class="vbtn line sm" data-t="live">● Live</span><span class="vbtn line sm">Past 30 minutes ▾</span></div>' +
      '<div style="display:flex;gap:10px">' +
      '<div class="vcard" data-t="logFilter" style="width:180px;padding:12px;font-size:12.5px;margin:0"><b>Filters</b><div class="muted" style="margin-top:8px">Contains Level</div><div><span class="vchk"></span>Warning</div><div><span class="vchk on">✓</span>Error</div><div class="muted" style="margin-top:8px">Function</div>' +
      '<div><span class="vchk"></span>/api/alerts</div><div><span class="vchk"></span>/api/market</div><div data-t="fPrice"><span class="vchk on">✓</span>/api/price</div><div><span class="vchk"></span>/api/risk</div></div>' +
      '<div class="vcard" data-t="logList" style="flex:1;padding:0;margin:0;font-family:Consolas,monospace;font-size:12px">' +
      '<div class="vrow muted" style="font-family:Segoe UI;font-weight:600"><span style="width:90px">Time</span><span style="width:46px">Status</span><span style="width:46px">Host</span><span class="msg">Request</span></div>' +
      '<div class="vrow"><span style="width:90px">15:12:04.21</span><span style="width:46px;color:#16a34a">200</span><span style="width:46px">ƒ</span><span class="msg">GET /api/price?codes=005930,000660 · 312ms</span></div>' +
      '<div class="vrow" data-t="errRow" style="background:#fef2f2"><span style="width:90px">15:15:41.03</span><span style="width:46px;color:#dc2626">401</span><span style="width:46px">ƒ</span><span class="msg">GET /api/price · {"error":"접근 코드가 필요해요"}</span></div>' +
      '<div class="vrow"><span style="width:90px">15:16:02.77</span><span style="width:46px;color:#16a34a">200</span><span style="width:46px">ƒ</span><span class="msg">GET /api/price?codes=005930 · 288ms</span></div>' +
      '<div class="vrow"><span style="width:90px">15:16:05.10</span><span style="width:46px;color:#16a34a">200</span><span style="width:46px">◫</span><span class="msg">GET /manifest.webmanifest</span></div></div></div>' +
      '<div class="muted" style="margin-top:10px" data-t="keep">ℹ️ Hobby 요금제는 런타임 로그를 <b>1시간</b> 동안 보관해요.</div></div>', 'Logs', true);
  }
  function vcNotify() {
    var r = function (t, n, w, e, p, dt) { return '<div class="vrow"' + (dt ? ' data-t="' + dt + '"' : '') + '><span class="msg" style="color:#171717"><b>' + t + '</b><br><span class="muted">' + n + '</span></span>' + [w, e, p].map(function (x) { return '<span style="width:64px;text-align:center"><span class="vtgl' + (x ? ' on' : '') + '"></span></span>'; }).join('') + '</div>'; };
    return pvc('/~/settings/notifications', teamSide('Settings') +
      '<div class="vc-sub"><div class="sub-h">Settings</div>' + nav([['General', ''], ['Billing', ''], ['Members', ''], ['Security & Privacy', ''], ['Account', ''], ['My Notifications', 'subNotify']], 'My Notifications') + '</div>' +
      '<div class="vc-main withsub"><h3>My Notifications</h3><div class="muted" style="margin:-6px 0 12px">Manage your personal notification settings. 바꾼 내용은 나에게만 적용돼요.</div>' +
      '<div class="vcard" style="padding:0" data-t="notifTable"><div class="vrow muted" style="font-weight:600"><span class="msg">Deployment</span><span style="width:64px;text-align:center">Web</span><span style="width:64px;text-align:center">Email</span><span style="width:64px;text-align:center">Push</span></div>' +
      r('Deployment Failures', '배포가 실패하면 알려 줘요', true, true, false, 'nFail') + r('Deployment Ready', '미리보기 배포가 준비되거나 Production이 바뀌면', true, false, false, 'nReady') + '</div>' +
      '<div class="vcard" style="padding:0" data-t="usageNotif"><div class="vrow muted" style="font-weight:600"><span class="msg">Usage</span><span style="width:64px;text-align:center">Web</span><span style="width:64px;text-align:center">Email</span><span style="width:64px;text-align:center">Push</span></div>' +
      r('Usage limit reached', '무료 한도에 도달하면', true, true, false, '') + '</div></div>', 'My Notifications – Settings');
  }
  function vcUsage() {
    var row = function (t, n, u, max, pct) { return '<div class="vrow" style="padding:7px 16px"' + (t ? ' data-t="' + t + '"' : '') + '><span style="width:210px;color:#171717">' + n + '</span><span style="flex:1"><span class="bar" style="display:block;margin:0;height:7px"><i style="width:' + pct + '%;background:#0070f3"></i></span></span><span style="width:150px;text-align:right" class="muted"><b style="color:#171717">' + u + '</b> / ' + max + '</span></div>'; };
    return pvc('/~/usage', teamSide('Usage') +
      '<div class="vc-main"><div style="display:flex;align-items:center;margin-bottom:12px"><h3 style="margin:0">Usage</h3><span class="gh-sp"></span><span class="vbtn line sm">Last 30 days ▾</span><span class="vbtn blue sm" style="margin-left:6px">Upgrade</span></div>' +
      '<div class="vcard" data-t="plan" style="padding:10px 18px;margin-bottom:10px"><b>Hobby</b> <span class="muted">· 무료 · 개인·비상업 용도 · 한도를 넘으면 해당 기능이 멈추고 30일 뒤 다시 사용</span></div>' +
      '<div class="vcard" style="padding:0;margin-bottom:10px"><div class="vrow muted" style="font-weight:600;padding:6px 16px"><span style="width:210px">Networking</span></div>' +
      row('uData', 'Fast Data Transfer', '0.06 GB', '100 GB', 1) + row('uReq', 'CDN Requests', '1.4K', '1M', 1) +
      '<div class="vrow muted" style="font-weight:600;padding:6px 16px"><span style="width:210px">Functions</span></div>' +
      '<div data-t="uFn">' + row('', 'Function Invocations', '312', '1M', 1) + row('', 'Active CPU', '1m 12s', '4h', 1) + row('', 'Provisioned Memory', '0.4 GB-Hrs', '360 GB-Hrs', 1) + '</div></div>' +
      '<div class="vcard" data-t="uTip" style="background:#f0f9ff;border-color:#bae6fd;padding:10px 16px"><b>💡 Tip</b><div class="muted" style="font-size:13px">배포는 하루 100번까지 할 수 있어요. 파일 여러 개를 한 번에 고쳐 저장하면 배포 횟수를 아낄 수 있어요.</div></div></div>', 'Usage');
  }

  /* ---------- 매매일지 앱 모의 ---------- */
  function appMock(o) {
    o = o || {};
    var cards = o.empty ?
      '<div class="app-card" data-t="emptyMsg" style="text-align:center;padding:30px 14px;color:#64748b"><div style="font-size:30px">🗒️</div>아직 등록한 종목이 없어요<br><small>＋ 버튼으로 첫 종목을 추가하세요</small></div>' :
      '<div class="app-card"><div class="muted">총 평가금액 (예시)</div><div class="big">12,480,000원</div><div class="up">평가손익 +386,000원 (+3.19%)</div></div>' +
      '<div class="app-card"><div class="row"><b>삼성전자</b><span class="up">+2.4%</span></div><div class="row"><b>SK하이닉스</b><span class="up">+5.1%</span></div><div class="row"><b>KODEX 200</b><span class="dn">-0.8%</span></div><div class="row"><b>NAVER</b><span class="up">+1.2%</span></div></div>';
    return '<div class="app" data-t="app"><div class="app-top"><span>📈 나의 주식매매일지</span><span class="app-gear" data-t="gear">⚙️</span></div>' +
      '<div class="app-tabs"><div class="on"><span>💰</span>자산현황</div><div><span>✍️</span>일기쓰기</div><div><span>📖</span>일기장</div><div><span>🔔</span>알림</div><div><span>📰</span>시황/이슈</div></div>' +
      cards +
      (o.settings ? '<div class="sheet" data-t="sheet"><h5>⚙️ 설정 및 백업</h5><div class="sec" data-t="instSec"><b>📲 앱으로 설치</b><p>홈 화면에 추가하면 앱처럼 전체 화면으로 열려요.</p><span class="bigbtn" data-t="inst">홈 화면에 설치</span></div>' +
        '<div class="sec"><b>🔑 NH투자증권 연결</b><p>APP Key · APP Secret</p></div><div class="sec"><b>📖 사용 설명서</b></div></div>' : '') +
      (o.backup ? '<div class="sheet" data-t="sheet"><h5>⚙️ 설정 및 백업</h5><div class="sec" data-t="backupSec"><b>데이터 백업</b><p>현재 앱에 저장된 자산·일기 데이터를 텍스트(JSON)로 복사합니다.</p><span class="bigbtn" data-t="bkBtn">백업 데이터 복사</span></div>' +
        '<div class="sec" data-t="restoreSec"><b>데이터 복구</b><p>백업 파일을 선택하거나 복사해둔 텍스트를 붙여넣으세요.</p><div class="inp wide" style="height:40px;color:#9ca3af;font-size:12px">백업 데이터 붙여넣기</div><span class="bigbtn" style="margin-top:6px;background:#e2e8f0;color:#1e293b">적용 (데이터 덮어쓰기)</span></div></div>' : '') + '</div>';
  }
  function appPC(a) {
    a = a || {};
    return win('https://' + (a.url || URL0), '<div style="position:absolute;inset:0;background:#e2e8f0;display:flex;justify-content:center"><div style="width:440px;height:100%;box-shadow:0 0 20px rgba(0,0,0,.1)">' + appMock({ empty: a.empty, backup: a.backup }) + '</div></div>', { tab: '나의 주식매매일지' });
  }
  function page404() {
    return win('https://' + URL0, '<div class="v404" data-t="nf404"><div class="c"><b>404</b><span style="font-size:14px">This page could not be found.<br><span class="muted">404: NOT_FOUND · Code: <code>NOT_FOUND</code> · ID: icn1::abc12-…</span></span></div></div>', { tab: '404: NOT_FOUND' });
  }

  /* ---------- 휴대폰 ---------- */
  function phoneWrap(inner, label) {
    return '<div class="phone-stage">' + (label ? '<div class="label-note">' + label + '</div>' : '') + '<div class="phone"><div class="scr">' + inner + '</div></div></div>';
  }
  function homeIcons(withNew) {
    var ic = [['📞', '전화'], ['💬', '메시지'], ['📷', '카메라'], ['🌐', 'Chrome'], ['🗺️', '지도'], ['🎵', '음악'], ['⚙️', '설정'], ['🗓️', '캘린더'], ['💛', '카카오톡'], ['🏦', '은행']];
    return '<div class="p-home">' + ic.map(function (x) { return '<div class="p-ic"><i>' + x[0] + '</i>' + x[1] + '</div>'; }).join('') +
      (withNew ? '<div class="p-ic new" data-t="newIcon"><i>📈</i>매매일지</div>' : '') + '</div>';
  }
  function phA(a) {
    var s = a.state, st = '<div class="p-status"><span>9:41</span><span>📶 🔋</span></div>';
    if (s === 'home') return phoneWrap(st.replace('class="p-status"', 'class="p-status" style="background:#1e3a8a;color:#fff"') + homeIcons(true), '안드로이드 · 홈 화면');
    var url = s === 'blank' ? '' : URL1;
    var bar = '<div class="p-bar"><span>⌂</span><div class="p-addr" data-t="pAddr">' + (url || '<span style="color:#9ca3af">검색어 또는 URL 입력</span>') + '</div><span data-t="pMenu">⋮</span></div>';
    var body = s === 'blank' ? '<div style="padding:60px 20px;text-align:center;color:#9ca3af"><div style="font-size:40px">🌐</div>새 탭</div>' : appMock({ settings: s === 'settings' || s === 'dialog' });
    var dlg = s === 'dialog' ? '<div class="p-dim"></div><div class="p-dialog"><b style="font-size:15px">앱을 설치하시겠어요?</b><div style="display:flex;gap:10px;align-items:center;margin-top:12px"><span style="font-size:30px">📈</span><div><b>매매일지</b><div class="muted">' + URL1 + '</div></div></div><div class="acts"><span>취소</span><span data-t="instOk">설치</span></div></div>' : '';
    var menu = s === 'menu' ? '<div class="p-menu"><div>← &nbsp; ☆ &nbsp; ⬇ &nbsp; ⓘ &nbsp; ↻</div><div>새 탭</div><div>새 시크릿 탭</div><div>방문 기록</div><div>북마크</div><div data-t="menuAdd"><b>📲 홈 화면에 추가</b></div><div>공유…</div><div>설정</div></div>' : '';
    return phoneWrap(st + bar + '<div class="p-body">' + body + dlg + '</div>' + menu, '안드로이드 · 크롬');
  }
  function phI(a) {
    var s = a.state, st = '<div class="p-status"><span>9:41</span><span>📶 🔋</span></div>';
    if (s === 'home') return phoneWrap(st.replace('class="p-status"', 'class="p-status" style="background:#1e3a8a;color:#fff"') + homeIcons(true).replace('🌐</i>Chrome', '🧭</i>Safari'), '아이폰 · 홈 화면');
    var body = '<div class="p-body">' + appMock() +
      (s === 'sheet' ? '<div class="p-dim"></div><div class="ios-sheet"><div style="display:flex;gap:10px;align-items:center;margin-bottom:10px"><span style="font-size:28px">📈</span><div><b>나의 주식매매일지</b><div class="muted">' + URL1 + '</div></div></div>' +
        '<div class="grp"><div>복사 <span>⧉</span></div><div>읽기 목록에 추가 <span>👓</span></div><div>즐겨찾기 추가 <span>☆</span></div><div data-t="addHome"><b>홈 화면에 추가</b> <span>⊞</span></div></div><div class="grp"><div>페이지에서 찾기 <span>🔍</span></div></div></div>' : '') +
      (s === 'add' ? '<div class="ios-sheet" style="top:0;border-radius:0;background:#f2f2f7"><div style="display:flex;justify-content:space-between;font-weight:600;margin-bottom:16px"><span style="color:#2563eb">취소</span><span>홈 화면에 추가</span><span style="color:#2563eb" data-t="addBtn">추가</span></div>' +
        '<div class="ios-add"><span class="ic">📈</span><div style="flex:1;min-width:0"><div class="nm" data-t="addName">매매일지</div><div class="u">' + URL1 + '</div></div></div>' +
        '<div class="grp"><div>웹 앱으로 열기 <span style="color:#16a34a">●</span></div></div></div>' : '') + '</div>';
    var bar = '<div class="p-bar" style="border-top:1px solid #e5e7eb;border-bottom:0"><div class="p-addr" data-t="pAddr" style="text-align:center">🔒 ' + URL1 + '</div></div>';
    var bottom = '<div class="p-bottom"><span>‹</span><span>›</span><span data-t="share">⬆︎</span><span>📖</span><span>⧉</span></div>';
    return phoneWrap(st + body + bar + bottom, '아이폰 · 사파리');
  }

  /* ---------- 슬라이드 ---------- */
  function intro() {
    var b = [['💻', '내 PC', '매매일지 폴더', 'pc'], ['🗂️', 'GitHub', '온라인 원고 보관소', 'gh'], ['▲', 'Vercel', '인터넷에 공개(배포)', 'vc'], ['🌐', '웹 주소', '○○.vercel.app', 'url'], ['📱', '휴대폰', '홈 화면 앱', 'phone']];
    return '<div class="slide"><h2>오늘 만들 것</h2><p class="lead">내 PC의 매매일지 → 인터넷 웹 앱 → 휴대폰 홈 화면 앱</p><div class="flow">' +
      b.map(function (x, i) { return (i ? '<span class="farrow">➜</span>' : '') + '<div class="fbox" data-t="' + x[3] + '"><i>' + x[0] + '</i>' + x[1] + '<small>' + x[2] + '</small></div>'; }).join('') +
      '</div><div style="margin-top:44px;display:flex;gap:16px;font-size:15px;color:#334155"><div class="citem" style="flex:1"><i>💸</i><div>비용<small>모두 무료 (GitHub 무료 · Vercel Hobby)</small></div></div><div class="citem" style="flex:1"><i>⌨️</i><div>코딩<small>필요 없어요. 클릭과 끌어다 놓기만!</small></div></div><div class="citem" style="flex:1"><i>⏱️</i><div>소요 시간<small>시연 약 100분 + 실습</small></div></div></div></div>';
  }
  function concept() {
    var r = [['pc', '💻', '내 PC', '📝 책상 서랍 속 원고', '나만 볼 수 있어요. PC를 끄면 아무도 못 봐요.'],
      ['gh', '🗂️', 'GitHub', '🏦 원고 보관소 (기록이 남는 금고)', '원본을 안전하게 보관하고, 언제 무엇을 고쳤는지 모두 기록해요.'],
      ['vc', '▲', 'Vercel', '🏭 인쇄소 + 24시간 서점', '보관소에서 원고를 가져와 책으로 만들어 전 세계 서점에 진열해요.'],
      ['url', '🌐', '웹 주소', '📍 서점 주소', '주소만 알면 누구나, 어디서든 찾아와 볼 수 있어요.']];
    return '<div class="slide" style="padding:34px 44px"><h2>GitHub와 Vercel, 왜 필요할까요?</h2><p class="lead" style="margin-bottom:16px">📚 책을 만들어 서점에 내놓는 과정에 비유해 보면</p>' +
      '<div class="atable">' + r.map(function (x) { return '<div class="arow" data-t="' + x[0] + '"><div class="a1"><i>' + x[1] + '</i>' + x[2] + '</div><div class="a2">' + x[3] + '</div><div class="a3">' + x[4] + '</div></div>'; }).join('') + '</div>' +
      '<div class="citem" data-t="q" style="margin-top:14px;max-width:none;background:#fff7ed;font-size:15px;align-items:flex-start"><i style="font-size:28px">🤔</i><div><b>내 PC에서 바로 공개하면 안 되나요?</b><small>PC는 꺼질 때가 있고 · 집 인터넷엔 고정 주소가 없고 · 바깥 사람이 내 PC에 들어오면 보안이 위험해요 → 그래서 전문 서비스에 맡겨요</small></div></div></div>';
  }
  function terms() {
    var t = [['📁', '저장소 (Repository)', '프로젝트 하나를 담는 온라인 폴더', 'w1'], ['💾', '커밋 (Commit)', '“이 상태로 저장 확정!” + 기록 한 줄', 'w2'],
      ['🚀', '배포 (Deployment)', '파일을 인터넷에 공개하는 일 (Vercel은 한 번 한 번을 “디플로이먼트”라 불러요)', 'w3'], ['🏗️', '빌드 (Build)', '재료를 완성품으로 만드는 과정 (우리 앱은 필요 없음)', 'w4'],
      ['👩‍🍳', '서버 함수 (Functions)', '손님 몰래 주방에서 일하는 직원 (현재가 조회 등)', 'w5'], ['📍', '도메인 (Domain)', '웹사이트 주소 (예: ○○.vercel.app)', 'w6']];
    return '<div class="slide"><h2>꼭 알아 둘 낱말 6개</h2><p class="lead">화면이 영어라도 이 낱말만 알면 길을 잃지 않아요</p><div class="clist">' +
      t.map(function (x) { return '<div class="citem" data-t="' + x[3] + '"><i>' + x[0] + '</i><div>' + x[1] + '<small>' + x[2] + '</small></div></div>'; }).join('') + '</div></div>';
  }
  function alts() {
    var g = [['aGH', 'GitHub ★', '사용자 가장 많음 · 자료와 강의 풍부', '화면이 영어'],
      ['aGL', 'GitLab', '자동화 도구 내장 · 회사 서버에 직접 설치 가능', '메뉴가 많고 복잡'],
      ['aBB', 'Bitbucket', 'Jira 등 회사 협업 도구와 잘 연결', '개인용 자료가 적음']];
    var n = [['aVC', 'Vercel ★', 'Next.js를 만든 회사 · 빠르고 화면이 깔끔 · api 폴더만 있으면 서버 함수', '무료(Hobby)는 개인·비상업 용도만'],
      ['aNF', 'Netlify', '폴더 끌어다 놓기 배포 · 폼 기능 기본 제공', '무료 크레딧 한도(월 300)'],
      ['aCF', 'Cloudflare Pages', '무료 트래픽 넉넉 · 전 세계 빠른 속도', '설정 메뉴가 어렵게 느껴짐'],
      ['aGP', 'GitHub Pages', '완전 무료 · GitHub 안에서 끝', '서버 함수 불가 (화면만 공개)']];
    var tbl = function (title, rows) {
      return '<div class="ctab"><div class="ct-h">' + title + '</div><div class="ct-r hd"><span>서비스</span><span>👍 장점</span><span>👎 단점</span></div>' +
        rows.map(function (r) { return '<div class="ct-r" data-t="' + r[0] + '"><span><b>' + r[1] + '</b></span><span>' + r[2] + '</span><span>' + r[3] + '</span></div>'; }).join('') + '</div>';
    };
    return '<div class="slide" style="padding:30px 40px"><h2>비슷한 서비스도 있어요</h2><p class="lead" style="margin-bottom:14px">★ 오늘 쓰는 조합: 개인 프로젝트는 무료, 서버 함수까지 클릭만으로 올라가요</p>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">' + tbl('🗂️ 코드 보관소 (GitHub 같은 곳)', g) + tbl('▲ 배포 서비스 (Vercel 같은 곳)', n) + '</div></div>';
  }
  function prep() {
    var it = [['💻', 'PC + 크롬 또는 엣지', '인터넷 연결 필요', 'prep1'], ['📧', '이메일 주소', 'GitHub 가입·인증용', 'prep2'],
      ['📁', '매매일지 폴더 (예: stock-journal)', '폴더 이름은 각자 만든 <b>임의의 이름</b>이에요', 'prep3'], ['📱', '스마트폰', '안드로이드(크롬) 또는 아이폰(사파리)', 'prep4']];
    return '<div class="slide"><h2>준비물</h2><p class="lead">시작 전에 네 가지를 확인해요</p><div class="clist">' +
      it.map(function (x) { return '<div class="citem" data-t="' + x[3] + '"><i>' + x[0] + '</i><div>' + x[1] + '<small>' + x[2] + '</small></div></div>'; }).join('') +
      '</div><div class="citem" data-t="how" style="margin-top:22px;max-width:820px;background:#eff6ff"><i>🖐</i><div>공부 방법<small>① 왼쪽 시연을 본다 → ② 오른쪽 “직접 해 보세요” 링크를 새 탭으로 연다 → ③ 똑같이 따라 한다 → ④ “실습을 마쳤어요” 체크</small></div></div></div>';
  }
  function why() {
    return '<div class="slide" style="padding:34px 44px"><h2>왜 GitHub를 거칠까요?</h2><p class="lead" style="margin-bottom:16px">Vercel에 올리는 두 가지 방법을 비교해 보면</p>' +
      '<div class="clist" style="max-width:none">' +
      '<div class="citem col" data-t="wCli"><div class="ch">⌨️ 명령어로 직접 올리기 (Vercel CLI)</div><div class="an">🚚 완성된 책을 <b>직접 차에 싣고 서점에</b> 가져다주는 방법</div>' +
      '<ul><li>개발자에게는 빠르고 편해요</li><li class="bad">검은 화면(터미널)에 명령어를 입력하고 프로그램을 설치해야 해요</li><li class="bad">고칠 때마다 내가 다시 실어 날라야 하고, 예전 원고는 따로 보관되지 않아요</li></ul></div>' +
      '<div class="citem col" data-t="wGit"><div class="ch">🗂️ GitHub 연결 <span class="pill ok">이번 강의</span></div><div class="an">🔗 원고 보관소와 인쇄소를 <b>전용 배송 라인</b>으로 연결</div>' +
      '<ul><li>클릭과 끌어다 놓기만으로 끝 (설치 ✕)</li><li>원고(파일)만 고치면 자동으로 다시 인쇄·진열</li><li>예전 원고가 모두 보관돼요</li></ul></div></div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:14px">' +
      '<div class="citem sm" data-t="b1"><i>🖱️</i><div>코딩·설치 없음<small>브라우저 클릭만으로</small></div></div>' +
      '<div class="citem sm" data-t="b2"><i>🔄</i><div>자동 배포<small>저장하면 1분 안에 반영</small></div></div>' +
      '<div class="citem sm" data-t="b3"><i>⏪</i><div>백업 + 되돌리기<small>실수해도 예전 상태로</small></div></div></div></div>';
  }
  function envIntro() {
    return '<div class="slide" style="padding:30px 40px"><h2>환경 변수 = 사장님의 비밀 수첩</h2><p class="lead" style="margin-bottom:14px">🍜 식당에 비유하면</p>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">' +
      '<div class="citem col" data-t="eMenu"><div class="ch">📋 코드 파일 = 메뉴판</div><small>GitHub에 올린 파일은 손님 누구나 볼 수 있는 메뉴판. 한 번 올라간 내용은 기록에 계속 남아요.</small></div>' +
      '<div class="citem col" data-t="eNote" style="background:#fefce8"><div class="ch">📒 환경 변수 = 사장님 수첩</div><small>금고 비밀번호처럼 남이 보면 안 되는 값은 Vercel에 따로 적어 둬요. 서버 함수만 몰래 꺼내 봐요.</small></div></div>' +
      '<div style="font-weight:700;margin:14px 0 8px;font-size:16px">왜 필요할까?</div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">' +
      '<div class="citem sm" data-t="r1"><i>🔐</i><div>비밀 보호<small>키가 새면 남이 내 이름으로 쓰고 요금이 나갈 수도</small></div></div>' +
      '<div class="citem sm" data-t="r2"><i>🔧</i><div>코드 그대로, 값만 변경<small>도어락 비번 바꾸려고 문을 새로 달지 않죠</small></div></div>' +
      '<div class="citem sm" data-t="r3"><i>🧪</i><div>환경마다 다른 값<small>Production·Preview·Development 따로</small></div></div></div>' +
      '<div style="font-weight:700;margin:14px 0 8px;font-size:16px">없어도 될까?</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">' +
      '<div class="citem sm" data-t="n1"><i>🙆</i><div>없어도 되는 기능<small>기록·일기·자산 계산 (브라우저 안에서 동작)</small></div></div>' +
      '<div class="citem sm" data-t="n2"><i>🔑</i><div>키가 있어야 되는 기능<small>현재가(NH) · 공시(DART) · AI 요약 (바깥 서비스 연결)</small></div></div></div></div>';
  }
  function envAccess() {
    return '<div class="slide" style="padding:30px 40px"><h2>ACCESS_CODE = 공동현관 비밀번호</h2><p class="lead" style="margin-bottom:20px">매매일지의 서버 함수 앞을 지키는 문지기 코드예요</p>' +
      '<div class="acflow">' +
      '<div class="acbox" data-t="acApp"><i>📱</i>내 앱<small>현재가 요청 + 🔑 접근 코드</small></div><span class="acarr">➜</span>' +
      '<div class="acbox gate" data-t="acGate"><i>🚪</i>서버 함수 문지기<small>Vercel의 ACCESS_CODE와 비교</small></div><span class="acarr">➜</span>' +
      '<div class="acbox ok" data-t="acNH"><i>📈</i>NH투자증권<small>코드가 맞으면 현재가 조회</small></div></div>' +
      '<div class="acflow" style="margin-top:14px;justify-content:flex-start;padding-left:0"><div class="acbox" data-t="acStranger" style="background:#f1f5f9"><i>🕵️</i>주소만 아는 다른 사람<small>코드 없음</small></div><span class="acarr">➜</span><div class="acbox no" data-t="acNo"><i>✋</i>거절 (401)<small>“접근 코드가 필요해요”</small></div></div>' +
      '<div class="citem" data-t="acQ" style="margin-top:18px;max-width:none;background:#fff7ed;font-size:15px;align-items:flex-start"><i style="font-size:28px">⚠️</i><div><b>ACCESS_CODE를 안 넣으면?</b><small>문이 활짝 열린 상태. 주소를 아는 누구나 내 키로 조회할 수 있고, 유료 AI 요약 키를 넣었다면 요금이 나에게 청구돼요. → 다른 키보다 먼저 넣어 두세요.</small></div></div></div>';
  }
  function finish() {
    var it = ['GitHub·Vercel 개념 이해', 'GitHub 저장소 만들고 업로드', 'Vercel 연결과 첫 배포', '메뉴 둘러보기·주소 바꾸기', '환경 변수(ACCESS_CODE)', '고치면 자동 배포', '로그·되돌리기·알림·도메인', '무료 사용량 관리', '휴대폰 홈 화면에 설치'];
    return '<div class="slide"><h2>🎉 수고하셨습니다!</h2><p class="lead">오늘 해낸 일</p><div class="clist" style="grid-template-columns:1fr 1fr 1fr;max-width:900px">' +
      it.map(function (x, i) { return '<div class="citem" data-t="d' + (i + 1) + '" style="font-size:15px"><i style="font-size:24px">' + (i + 1) + '</i><div>' + x + '</div></div>'; }).join('') +
      '</div><div class="citem" style="font-size:15px;background:#eff6ff;margin-top:16px;max-width:900px"><i style="font-size:24px">🔗</i><div>내 앱 주소<small>' + URL1 + '</small></div></div></div>';
  }

  window.SCREENS = {
    intro: intro, concept: concept, terms: terms, alts: alts, prep: prep, why: why, envIntro: envIntro, envAccess: envAccess, finish: finish,
    explorer: pc(explorer, 'exp'),
    ghSignup: pc(ghSignup), ghHome: pc(ghHome), ghNewRepo: pc(ghNewRepo), ghEmptyRepo: pc(ghEmptyRepo), ghUpload: pc(ghUpload), ghRepo: pc(ghRepo), ghAuth: pc(ghAuth), ghInstall: pc(ghInstall), ghFile: pc(ghFile),
    vcSignup: pc(vcSignup), vcHome: pc(vcHome), vcNew: pc(vcNew), vcConfig: pc(vcConfig), vcDeploying: pc(vcDeploying), vcOverview: pc(vcOverview),
    vcSettingsGeneral: pc(vcSettingsGeneral), vcDomains: pc(vcDomains), vcBuildSettings: pc(vcBuildSettings), vcEnv: pc(vcEnv), vcDeployments: pc(vcDeployments),
    vcDeployDetail: pc(vcDeployDetail), vcRollback: pc(vcRollback), vcLogs: pc(vcLogs), vcNotify: pc(vcNotify), vcUsage: pc(vcUsage),
    appPC: pc(appPC), page404: pc(page404), phA: phA, phI: phI
  };
})();
