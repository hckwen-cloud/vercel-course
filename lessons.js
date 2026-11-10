/* 강의 내용
   segs: 음성으로 읽을 문장(say)과 그동안 왼쪽 화면에서 할 동작(do)
   동작: ['screen',화면,옵션] ['click',대상] ['move',대상] ['blink',대상,ms] ['check',대상]
         ['type',대상,글자] ['show',대상] ['hide',대상] ['on',대상] ['set',대상,html] ['wait',ms] ['drag',출발,도착,[이름들]] */
(function () {
  var C0 = '시작하기', C1 = '1장. 매매일지 파일 살펴보기', C2 = '2장. GitHub에 파일 올리기', C3 = '3장. Vercel에 연결하고 배포하기',
    C4 = '4장. 내 앱 확인과 프로젝트 메뉴', C5 = '5장. 비밀 값 넣기 (환경 변수)', C6 = '6장. 고치고 다시 올리기',
    C7 = '7장. Vercel 더 잘 쓰기', C8 = '8장. 휴대폰에 앱 설치하기', C9 = '마무리';
  var MENU_TIP = '메뉴 이름과 위치는 Vercel 업데이트로 조금씩 바뀔 수 있어요. 비슷한 이름을 찾으면 됩니다.';
  var BUSY = '<span class="dot run"></span>Building', READY = '<span class="dot ok"></span>Ready';

  window.STEPS = [
    /* ===== 시작하기 ===== */
    { id: 'intro', ch: C0, title: '오늘 만들 것',
      segs: [
        { say: '안녕하세요. 오늘은 내 컴퓨터에 있는 <b>나의 주식매매일지</b>를 인터넷 주소로 열 수 있는 웹 앱으로 만들고, 휴대폰 홈 화면에 설치하는 것까지 해 보겠습니다.', do: [['screen', 'intro']] },
        { say: '먼저 내 PC에 있는 매매일지 폴더를,', do: [['blink', 'pc', 1500]] },
        { say: '<b>GitHub</b>라는 온라인 원고 보관소에 올립니다.', do: [['blink', 'gh', 1500]] },
        { say: '그러면 <b>Vercel</b>이 GitHub의 파일을 가져가서 인터넷에 공개해 줍니다. 이것을 <b>배포</b>라고 부릅니다.', do: [['blink', 'vc', 2200]] },
        { say: '배포가 끝나면 누구나 접속할 수 있는 웹 주소가 생기고,', do: [['blink', 'url', 1500]] },
        { say: '마지막으로 그 주소를 휴대폰에서 열어 앱처럼 설치합니다.', do: [['blink', 'phone', 1500]] },
        { say: '모든 과정은 무료이고, 코딩은 하지 않아도 됩니다. 클릭과 끌어다 놓기만으로 충분합니다.', do: [['check', 'pc'], ['check', 'gh'], ['check', 'vc'], ['check', 'url'], ['check', 'phone']] }
      ],
      tip: '왼쪽 화면은 시연용 <b>모의 화면</b>이에요. 실제 GitHub·Vercel 화면 구성을 최대한 따라 만들었지만, 업데이트로 메뉴 이름이나 위치가 조금 다를 수 있어요.'
    },
    { id: 'concept', ch: C0, title: 'GitHub와 Vercel은 왜 필요할까요?',
      segs: [
        { say: 'GitHub와 Vercel은 평소에 접할 일이 없어서 낯설지요? 책을 만들어 서점에 내놓는 과정에 비유해 보겠습니다.', do: [['screen', 'concept']] },
        { say: '내 PC에 있는 매매일지 파일은 <b>책상 서랍 속 원고</b>와 같습니다. 나만 볼 수 있고, PC를 끄면 아무도 볼 수 없습니다.', do: [['blink', 'pc', 2600]] },
        { say: '<b>GitHub</b>는 원고를 맡겨 두는 튼튼한 <b>원고 보관소</b>입니다. 원본을 안전하게 보관하고, 언제 무엇을 고쳤는지 기록이 모두 남습니다. 그래서 실수해도 예전 원고로 돌아갈 수 있습니다.', do: [['blink', 'gh', 3600]] },
        { say: '<b>Vercel</b>은 <b>인쇄소와 서점</b>을 함께 운영하는 곳입니다. 보관소에서 원고를 가져와 책으로 만들고, 하루 24시간 문을 여는 전 세계 서점에 진열해 줍니다.', do: [['blink', 'vc', 3400]] },
        { say: '서점의 위치가 바로 <b>웹 주소</b>입니다. 주소만 알면 누구나, 어디서든 찾아와 볼 수 있습니다.', do: [['blink', 'url', 2000]] },
        { say: '그럼 내 PC에서 바로 공개하면 안 될까요? PC는 꺼질 때가 있고, 집 인터넷에는 고정된 주소가 없고, 바깥 사람이 내 PC에 들어오면 보안도 위험합니다. 그래서 이 일을 전문 서비스에 맡기는 것입니다.', do: [['blink', 'q', 4000], ['check', 'q']] }
      ],
      tip: '<b>GitHub</b>는 전 세계 개발자 1억 명 이상이 쓰는 코드 보관 서비스(마이크로소프트 운영)이고, <b>Vercel</b>은 웹사이트를 쉽게 공개해 주는 배포 서비스예요. Next.js라는 유명한 웹 도구를 만든 회사이기도 해요. 둘 다 개인은 무료로 시작할 수 있어요.'
    },
    { id: 'terms', ch: C0, title: '꼭 알아 둘 낱말 6개',
      segs: [
        { say: '앞으로 화면에 영어 낱말이 자주 나옵니다. 여섯 개만 알아 두면 길을 잃지 않습니다.', do: [['screen', 'terms']] },
        { say: '<b>저장소</b>, 영어로 Repository는 프로젝트 하나를 담는 온라인 폴더입니다. <b>커밋</b>은 “이 상태로 저장을 확정한다”는 뜻이고, 할 때마다 기록이 한 줄씩 남습니다.', do: [['blink', 'w1', 2000], ['blink', 'w2', 2000]] },
        { say: '<b>배포</b>는 파일을 인터넷에 공개하는 일입니다. Vercel에서는 배포 한 번 한 번을 <b>디플로이먼트</b>라고 부릅니다. <b>빌드</b>는 재료를 완성품으로 만드는 과정인데, 우리 앱은 이미 완성된 파일이라 빌드가 필요 없습니다.', do: [['blink', 'w3', 2400], ['blink', 'w4', 2200]] },
        { say: '<b>서버 함수</b>는 손님 눈에 보이지 않는 주방에서 일하는 직원과 같습니다. 현재가 조회처럼 화면 뒤에서 일합니다. <b>도메인</b>은 웹사이트 주소입니다.', do: [['blink', 'w5', 2400], ['blink', 'w6', 1600]] }
      ]
    },
    { id: 'alts', ch: C0, title: '비슷한 서비스도 있어요',
      segs: [
        { say: 'GitHub와 Vercel만 있는 것은 아닙니다. 비슷한 서비스들을 간단히 비교해 보겠습니다.', do: [['screen', 'alts']] },
        { say: '코드 보관소로는 GitHub가 가장 많이 쓰여 자료와 강의가 풍부합니다. 다만 화면이 영어입니다.', do: [['blink', 'aGH', 2200]] },
        { say: '<b>GitLab</b>은 자동화 도구가 들어 있고 회사 서버에 직접 설치할 수 있지만, 메뉴가 많아 복잡합니다. <b>Bitbucket</b>은 Jira 같은 회사 협업 도구와 잘 연결되지만, 개인용 자료는 적은 편입니다.', do: [['blink', 'aGL', 2000], ['blink', 'aBB', 2000]] },
        { say: '배포 서비스로 오늘 쓰는 <b>Vercel</b>은 빠르고 화면이 깔끔하며, api 폴더에 파일만 넣으면 서버 함수가 만들어집니다. 다만 무료인 Hobby 요금제는 <b>개인적인 비상업 용도</b>로만 쓸 수 있습니다.', do: [['blink', 'aVC', 3200]] },
        { say: '<b>Netlify</b>는 폴더를 끌어다 놓아 배포할 수 있고 폼 기능이 들어 있지만, 무료 사용량을 크레딧으로 관리합니다.', do: [['blink', 'aNF', 2400]] },
        { say: '<b>Cloudflare Pages</b>는 무료 트래픽이 넉넉하고 빠르지만 설정 메뉴가 어렵게 느껴질 수 있고, <b>GitHub Pages</b>는 완전 무료지만 서버 함수를 쓸 수 없어 현재가 조회가 동작하지 않습니다.', do: [['blink', 'aCF', 2000], ['blink', 'aGP', 2000]] },
        { say: '개인용 매매일지라면 무료로 서버 함수까지 쉽게 올릴 수 있는 <b>GitHub와 Vercel</b> 조합이 잘 맞습니다.', do: [['check', 'aGH'], ['check', 'aVC']] }
      ],
      tip: '요금과 무료 한도는 서비스마다 자주 바뀌어요. 쓰기 전에 각 서비스의 요금(Pricing) 페이지를 한 번 확인하세요.',
      warn: '매매일지를 <b>돈을 받고 팔거나 회사 업무용</b>으로 쓰려면 Vercel 무료(Hobby) 요금제가 아니라 유료(Pro) 요금제가 필요해요.'
    },
    { id: 'prep', ch: C0, title: '준비물 확인',
      segs: [
        { say: '시작하기 전에 준비물을 확인해 볼까요?', do: [['screen', 'prep']] },
        { say: '첫째, 인터넷이 되는 PC와 크롬 또는 엣지 브라우저입니다.', do: [['check', 'prep1']] },
        { say: '둘째, 가입할 때 쓸 이메일 주소입니다. 인증 메일을 확인할 수 있어야 합니다.', do: [['check', 'prep2']] },
        { say: '셋째, 매매일지 파일이 들어 있는 폴더입니다. 화면의 <b>stock-journal</b>은 예시 이름입니다. 수강생이 직접 만든 폴더라면 이름은 무엇이든 괜찮습니다. 중요한 것은 폴더 안에 든 내용입니다.', do: [['blink', 'prep3', 3000], ['check', 'prep3']] },
        { say: '넷째, 마지막 단계에서 쓸 스마트폰입니다. 안드로이드와 아이폰 모두 됩니다.', do: [['check', 'prep4']] },
        { say: '공부하는 방법은 간단합니다. 왼쪽 시연을 보고, 오른쪽 <b>직접 해 보세요</b> 상자의 링크를 새 탭으로 열어 똑같이 따라 하면 됩니다.', do: [['blink', 'how', 2500]] }
      ],
      mission: { text: '오른쪽 아래 버튼으로 강의를 조작해요. <ul><li><b>다음 ▶</b> 또는 키보드 <b>→</b>: 다음 단계</li><li><b>Space</b>: 일시정지 / 계속</li><li><b>↺ 다시</b>: 이 단계를 처음부터 다시 보기</li><li>목소리가 안 나오면 PC 소리를 켜거나 아래 🔊 음성 칸을 확인하세요.</li></ul>' },
      tip: '교재에서는 매매일지 폴더 이름을 <code>stock-journal</code>로 부르지만, 이것은 <b>수강생이 만든 임의의 폴더 이름</b>이에요. 예: <code>내매매일지</code>, <code>journal-app</code> 등 무엇이든 됩니다.'
    },

    /* ===== 1장 ===== */
    { id: 'folder', ch: C1, title: '매매일지 폴더 열어 보기',
      segs: [
        { say: '작업 표시줄의 노란 폴더 아이콘으로 파일 탐색기를 열고, 매매일지 파일을 넣어 둔 폴더로 갑니다. 교재에서는 문서 폴더 안의 stock-journal 폴더를 예로 듭니다.', do: [['screen', 'explorer', { dir: 'root' }], ['blink', 'path', 2200]] },
        { say: '다시 말하지만 <b>stock-journal은 예시 이름</b>입니다. 폴더 이름과 위치는 사람마다 달라도 괜찮습니다.', do: [['blink', 'nameNote', 2400]] },
        { say: '폴더를 열면 네 가지가 보입니다. <b>api</b> 폴더에는 현재가 조회처럼 서버에서 일하는 작은 프로그램, 즉 <b>서버 함수</b>가 들어 있습니다.', do: [['move', 'f-api'], ['blink', 'f-api', 2200]] },
        { say: '<b>public</b> 폴더에는 사람들이 보게 될 앱 화면 파일이 들어 있습니다.', do: [['move', 'f-public'], ['blink', 'f-public', 1600]] },
        { say: '<b>vercel.json</b>은 Vercel에게 “사람들에게 보여 줄 화면은 public 폴더에 있어요”라고 알려 주는 설정 파일입니다.', do: [['move', 'f-json'], ['blink', 'f-json', 2500]] },
        { say: '<b>README.md</b>는 설명서입니다. 이 네 가지를 통째로 올리면 됩니다.', do: [['move', 'f-readme'], ['check', 'f-api'], ['check', 'f-public'], ['check', 'f-readme'], ['check', 'f-json']] }
      ],
      mission: { text: '파일 탐색기(<b>Windows 키 + E</b>)를 열고 내 매매일지 폴더에 <code>api</code>, <code>public</code>, <code>vercel.json</code>, <code>README.md</code> 네 가지가 있는지 확인하세요.' },
      tip: '파일 끝의 <code>.json</code>, <code>.md</code> 같은 확장자가 안 보이면 탐색기의 <b>보기 › 표시 › 파일 확장명</b>을 켜세요.',
      warn: 'Netlify 교재에서 쓰던 폴더(<code>netlify</code> 폴더, <code>netlify.toml</code>)와는 구성이 달라요. Vercel용 매매일지 폴더(<code>api</code>, <code>vercel.json</code>이 있는 것)를 쓰세요.'
    },
    { id: 'apidir', ch: C1, title: 'api 폴더: 파일 하나가 서버 함수 하나',
      segs: [
        { say: 'api 폴더를 열어 보겠습니다. Vercel에는 아주 간단한 규칙이 있습니다.', do: [['screen', 'explorer', { dir: 'root' }], ['click', 'f-api'], ['click', 'f-api'], ['screen', 'explorer', { dir: 'api' }]] },
        { say: 'api 폴더 안의 <b>파일 하나가 서버 함수 하나</b>가 됩니다. 예를 들어 price.js는 내 주소 뒤에 /api/price 를 붙인 곳에서 일하는 현재가 담당 직원이 됩니다.', do: [['blink', 'f-price', 3200], ['check', 'f-price']] },
        { say: '마찬가지로 alerts는 공시 알림, market은 시황 요약, risk는 시장 위험 브리핑을 맡습니다.', do: [['blink', 'f-alerts', 1200], ['blink', 'f-market', 1200], ['blink', 'f-risk', 1200]] },
        { say: '밑줄로 시작하는 <b>_lib</b> 폴더는 서버 함수가 되지 않습니다. 직원들이 함께 쓰는 공구함이라고 생각하면 됩니다.', do: [['blink', 'f-lib', 2400]] },
        { say: '이 규칙 덕분에 Vercel에서 따로 설정하지 않아도, 폴더를 올리기만 하면 서버 함수가 자동으로 만들어집니다.', do: [['check', 'f-alerts'], ['check', 'f-market'], ['check', 'f-risk']] }
      ],
      tip: '<b>vercel.json</b> 안에는 두 가지만 적혀 있어요. ① 공개할 폴더는 <code>public</code> ② 앱 업데이트 파일(<code>sw.js</code>)은 항상 새로 받기. 열어 보기만 하고 고칠 필요는 없어요.'
    },
    { id: 'pwa', ch: C1, title: '앱 설치 준비는 이미 되어 있어요',
      segs: [
        { say: '이번에는 public 폴더를 열어 보겠습니다.', do: [['screen', 'explorer', { dir: 'root' }], ['click', 'f-public'], ['click', 'f-public'], ['screen', 'explorer', { dir: 'public' }]] },
        { say: '<b>index.html</b>이 매매일지 앱 화면 그 자체입니다.', do: [['blink', 'f-index', 1600]] },
        { say: '<b>manifest.webmanifest</b>는 앱 이름과 아이콘을 적어 둔 파일이고,', do: [['blink', 'f-manifest', 1600]] },
        { say: '<b>sw.js</b>는 인터넷이 끊겨도 화면이 열리게 해 주는 파일입니다.', do: [['blink', 'f-sw', 1600]] },
        { say: '<b>icons</b> 폴더에는 홈 화면에 표시될 아이콘 그림이 있습니다.', do: [['blink', 'f-icons', 1400]] },
        { say: '이 세 가지 덕분에 휴대폰 홈 화면에 앱처럼 설치할 수 있습니다. 이런 웹 앱을 <b>PWA</b>라고 부릅니다. 우리 매매일지는 이미 준비가 끝나 있어서 따로 할 일이 없습니다.', do: [['check', 'f-manifest'], ['check', 'f-sw'], ['check', 'f-icons']] }
      ],
      tip: 'PWA(Progressive Web App)는 앱스토어를 거치지 않고 웹 주소에서 바로 설치하는 앱이에요. 설치하면 주소창 없이 전체 화면으로 열립니다.'
    },
    { id: 'why', ch: C1, title: '왜 GitHub를 거쳐서 올릴까요?',
      segs: [
        { say: 'Vercel에 파일을 올리는 방법은 크게 두 가지입니다. 앞에서 쓴 책과 서점 비유로 비교해 보겠습니다.', do: [['screen', 'why']] },
        { say: '첫째, <b>Vercel CLI</b>라는 명령어 도구로 직접 올리는 방법입니다. 완성된 책을 직접 차에 싣고 서점에 가져다주는 것과 같습니다.', do: [['blink', 'wCli', 3000]] },
        { say: '개발자에게는 편하지만, 검은 화면에 명령어를 입력하고 프로그램을 설치해야 합니다. 고칠 때마다 다시 실어 날라야 하고, 예전 원고도 따로 보관되지 않습니다.', do: [['blink', 'wCli', 3200]] },
        { say: '둘째, <b>GitHub 연결</b>은 원고 보관소와 인쇄소를 전용 배송 라인으로 이어 두는 것입니다. 원고만 고치면 인쇄소가 알아서 다시 찍어 서점에 진열합니다.', do: [['blink', 'wGit', 3400]] },
        { say: '그래서 장점이 세 가지입니다. 설치나 코딩 없이 <b>클릭만으로</b> 끝나고,', do: [['blink', 'b1', 1600], ['check', 'b1']] },
        { say: 'GitHub에 저장하기만 하면 1분 안에 <b>자동으로 다시 배포</b>되며,', do: [['blink', 'b2', 1600], ['check', 'b2']] },
        { say: '예전 원고가 모두 보관되어 있어 실수해도 <b>예전 상태로 되돌릴</b> 수 있습니다. 그래서 오늘은 GitHub를 거쳐서 올립니다.', do: [['blink', 'b3', 1600], ['check', 'b3'], ['check', 'wGit']] }
      ]
    },

    /* ===== 2장 ===== */
    { id: 'gh-signup', ch: C2, title: 'GitHub 가입하기',
      segs: [
        { say: '먼저 GitHub에 가입합니다. 엣지나 크롬 주소창에 github.com/signup 을 입력하면 가입 화면이 열립니다.', do: [['screen', 'ghSignup'], ['blink', 'addr', 1800]] },
        { say: '구글 계정으로 계속하기도 있지만, 여기서는 이메일로 가입하겠습니다. 이메일을 입력하고,', do: [['click', 'gEmail'], ['type', 'gEmail', 'hong@example.com']] },
        { say: '비밀번호를 정합니다. 15자 이상이거나, 숫자와 소문자를 섞은 8자 이상이어야 합니다. 다른 사이트와 다른 비밀번호를 쓰세요.', do: [['click', 'gPw'], ['type', 'gPw', '••••••••••••']] },
        { say: '사용자 이름을 정합니다. 영어, 숫자, 하이픈만 쓸 수 있고, 이 이름이 내 GitHub 주소에 들어갑니다.', do: [['click', 'gUser'], ['type', 'gUser', 'hong-trader']] },
        { say: '<b>Continue</b>를 누른 뒤, 퍼즐 확인과 이메일로 온 인증 코드를 입력하면 가입이 끝납니다.', do: [['click', 'gCont'], ['check', 'gCont']] }
      ],
      mission: { text: 'GitHub에 가입하고 로그인까지 해 보세요. 사용자 이름은 메모해 두세요. (이미 계정이 있다면 넘어가세요)', links: [['GitHub 가입', 'https://github.com/signup']] },
      tip: '교재 예시의 사용자 이름은 <code>hong-trader</code>예요. 실습할 때는 <b>본인 이름</b>이 들어갑니다.'
    },
    { id: 'gh-home', ch: C2, title: 'GitHub 첫 화면과 ＋ 메뉴 둘러보기',
      segs: [
        { say: '가입하고 로그인하면 이런 첫 화면, 대시보드가 나옵니다. 영어라서 낯설지만 자주 쓰는 곳은 몇 군데뿐입니다.', do: [['screen', 'ghHome']] },
        { say: '왼쪽은 내 저장소 목록입니다. 아직 비어 있고, 초록색 <b>New</b> 버튼으로도 저장소를 만들 수 있습니다.', do: [['blink', 'topRepos', 2200]] },
        { say: '가운데 <b>Ask Copilot</b>은 GitHub의 AI 도우미에게 질문하는 칸입니다. 오늘은 쓰지 않습니다.', do: [['blink', 'copilotBox', 2000]] },
        { say: '위쪽 검색창에서는 저장소나 코드를 찾을 수 있습니다.', do: [['blink', 'ghSearch', 1600]] },
        { say: '동그라미 모양은 <b>이슈</b>, 즉 할 일과 문제 목록이고, 화살표 모양은 <b>풀 리퀘스트</b>, 즉 다른 사람이 보낸 수정 제안입니다. 편지함 모양은 알림입니다. 혼자 쓸 때는 거의 쓰지 않습니다.', do: [['blink', 'ghIssues', 1500], ['blink', 'ghPR', 1500], ['blink', 'ghInbox', 1500]] },
        { say: '이제 <b>더하기 버튼</b>을 눌러 보겠습니다. 무언가를 새로 만들 때 쓰는 드롭다운 메뉴입니다.', do: [['click', 'plus'], ['show', 'plusMenu']] },
        { say: '<b>New repository</b>는 새 저장소를 만듭니다. 오늘 우리가 쓸 메뉴입니다.', do: [['blink', 'newRepo', 1800]] },
        { say: '<b>Import repository</b>는 GitLab 같은 다른 곳에 있던 저장소를 통째로 옮겨 옵니다.', do: [['blink', 'mImport', 1800]] },
        { say: '<b>New codespace</b>는 프로그램을 설치하지 않고 브라우저 안에서 코드를 편집하는 작업 공간을 엽니다.', do: [['blink', 'mCodespace', 2000]] },
        { say: '<b>New gist</b>는 짧은 메모나 코드 조각 하나를 빠르게 공유할 때 씁니다.', do: [['blink', 'mGist', 1800]] },
        { say: '<b>New organization</b>은 회사나 모임처럼 여러 사람이 함께 쓰는 단체 계정을, <b>New project</b>는 할 일을 칸반 보드로 관리하는 프로젝트 보드를 만듭니다.', do: [['blink', 'mOrg', 1800], ['blink', 'mProject', 1800]] }
      ],
      mission: { text: 'GitHub에 로그인해 첫 화면을 둘러보고, 오른쪽 위 <b>＋ ▾</b>를 눌러 메뉴를 확인해 보세요. (아직 누르지 않아도 돼요)', links: [['GitHub 열기', 'https://github.com/']] },
      tip: '화면 구성은 계정이나 업데이트에 따라 조금 다를 수 있어요. <b>＋</b> 모양 버튼과 <b>New repository</b>만 찾으면 됩니다.'
    },
    { id: 'gh-repo', ch: C2, title: '새 저장소(Repository) 만들기',
      segs: [
        { say: '더하기 메뉴에서 <b>New repository</b>를 누르면 새 저장소 만들기 화면이 열립니다. 저장소는 프로젝트 하나를 담는 온라인 폴더입니다.', do: [['screen', 'ghHome'], ['click', 'plus'], ['show', 'plusMenu'], ['click', 'newRepo'], ['screen', 'ghNewRepo']] },
        { say: '화면은 두 부분입니다. 1번 <b>General</b>, 기본 정보입니다. <b>Owner</b>는 저장소의 주인으로, 내 계정 이름이 이미 골라져 있습니다.', do: [['blink', 'sec1', 1500], ['blink', 'owner', 1800]] },
        { say: '<b>Repository name</b>에 stock-journal 이라고 입력합니다. 영어, 숫자, 하이픈을 쓰고 띄어쓰기는 할 수 없습니다. 초록색으로 쓸 수 있다는 표시가 나오면 됩니다.', do: [['click', 'repoName'], ['type', 'repoName', 'stock-journal'], ['show', 'avail']] },
        { say: '<b>Description</b>은 저장소 설명입니다. 선택 사항이라 비워 두어도 됩니다.', do: [['blink', 'desc', 1800]] },
        { say: '2번 <b>Configuration</b>, 저장소 설정입니다. 먼저 <b>Choose visibility</b>, 공개 범위 드롭다운을 열어 보겠습니다.', do: [['blink', 'sec2', 1200], ['click', 'visDD'], ['show', 'visMenu']] },
        { say: '<b>Public</b>은 인터넷의 누구나 내 파일을 볼 수 있습니다. 오픈소스나 포트폴리오를 공개할 때 씁니다.', do: [['blink', 'vPub', 2200]] },
        { say: '<b>Private</b>은 나와 내가 초대한 사람만 볼 수 있습니다. 매매일지는 개인 기록이니 Private을 고릅니다. 비공개여도 Vercel 배포에는 문제가 없습니다.', do: [['click', 'vPriv'], ['hide', 'visMenu'], ['set', 'visDD', '🔒 Private ▾'], ['check', 'visDD']] },
        { say: '<b>Start with a template</b>은 다른 저장소를 본떠 시작할 때 고릅니다. No template 그대로 둡니다.', do: [['blink', 'tplDD', 1800]] },
        { say: '<b>Add README</b>는 설명서 파일을 자동으로 만들어 주는 스위치입니다. 우리 폴더에는 이미 README가 있으니 꺼 둡니다. 켜면 빈 저장소 화면이 나오지 않아 다음 단계 화면이 달라집니다.', do: [['blink', 'readmeTg', 2600]] },
        { say: '<b>Add .gitignore</b>는 올리지 않을 파일 목록을, <b>Add license</b>는 다른 사람이 내 코드를 쓸 수 있는 조건을 정하는 드롭다운입니다. 둘 다 없음으로 둡니다.', do: [['blink', 'giDD', 1800], ['blink', 'licDD', 1800]] },
        { say: '오른쪽 아래 초록색 <b>Create repository</b> 버튼을 누릅니다.', do: [['blink', 'createRepo', 1200], ['click', 'createRepo']] }
      ],
      mission: { text: '저장소 이름 <code>stock-journal</code>, 공개 범위 <b>Private</b>, README는 <b>Off</b>로 저장소를 만드세요. (저장소 이름도 원하는 영어 이름으로 바꿔도 돼요)', links: [['새 저장소 만들기', 'https://github.com/new']] },
      tip: '드롭다운 정리: <b>visibility</b> 공개 범위 · <b>template</b> 견본 저장소 · <b>.gitignore</b> 올리지 않을 파일 규칙 · <b>license</b> 사용 허락 조건. 개인 앱이라면 visibility만 Private으로 바꾸면 됩니다.'
    },
    { id: 'gh-upload-open', ch: C2, title: '파일 올리기 화면 열기',
      segs: [
        { say: '빈 저장소가 만들어졌습니다. 위쪽의 Code, Issues 같은 탭은 저장소 안의 메뉴입니다. 파란색 <b>Quick setup</b> 상자를 보세요.', do: [['screen', 'ghEmptyRepo'], ['blink', 'setup', 1800]] },
        { say: '상자 아래쪽 문장에서 <b>uploading an existing file</b>, 즉 기존 파일 올리기를 누릅니다.', do: [['blink', 'uploadLink', 1500], ['click', 'uploadLink']] },
        { say: '파일을 끌어다 놓을 수 있는 화면이 열렸습니다. 파일 탐색기를 왼쪽에, 브라우저를 오른쪽에 나란히 두면 편합니다.', do: [['screen', 'ghUpload', {}], ['blink', 'drop', 1800]] }
      ],
      mission: { text: '방금 만든 저장소 화면에서 <b>uploading an existing file</b>을 눌러 업로드 화면을 여세요. 안 보이면 <b>Add file ▾ › Upload files</b>를 눌러도 됩니다.' },
      tip: '창을 화면 반쪽으로 나란히 두려면 창을 선택하고 <b>Windows 키 + ←</b> 또는 <b>→</b>를 누르세요.'
    },
    { id: 'gh-drag', ch: C2, title: '폴더 안의 내용 끌어다 놓기',
      segs: [
        { say: '파일 탐색기에서 내 매매일지 폴더를 열고, 안에 있는 네 가지를 모두 선택합니다. 컨트롤 키와 A를 함께 누르면 한 번에 선택됩니다.', do: [['screen', 'ghUpload', {}], ['click', 'mItems'], ['screen', 'ghUpload', { sel: true }], ['check', 'mItems', 300]] },
        { say: '선택한 것들을 브라우저의 점선 상자 위로 끌어다 놓습니다.', do: [['drag', 'mItems', 'drop', ['api', 'public', 'README.md', 'vercel.json']]] },
        { say: '잠시 기다리면 올라간 파일 목록이 나타납니다. 하위 폴더 안의 파일까지 모두 올라갑니다.', do: [['screen', 'ghUpload', { sel: true, uploaded: true }], ['blink', 'uplist', 2200]] }
      ],
      warn: '<b>매매일지 폴더 자체</b>를 끌어다 놓지 말고, 폴더를 연 다음 <b>안의 네 가지</b>를 끌어다 놓으세요. 그래야 <code>api</code> 폴더와 <code>vercel.json</code>이 저장소 맨 위에 놓여 Vercel이 자동으로 알아봐요.',
      mission: { text: '<code>api</code>, <code>public</code>, <code>README.md</code>, <code>vercel.json</code>을 모두 선택해 업로드 상자에 끌어다 놓으세요. (크롬·엣지에서 폴더째 올라가요)' }
    },
    { id: 'gh-commit', ch: C2, title: '커밋하기 (저장 확정)',
      segs: [
        { say: '아래쪽에 <b>Commit changes</b> 상자가 있습니다. 커밋은 “이 상태로 저장을 확정한다”는 뜻입니다.', do: [['screen', 'ghUpload', { sel: true, uploaded: true }], ['blink', 'cbox', 2200]] },
        { say: '첫 번째 선택지는 main, 즉 원본 갈래에 바로 저장하는 것이고, 두 번째는 새 갈래를 만들어 검토를 받는 방법입니다. 혼자 쓸 때는 첫 번째 그대로 둡니다.', do: [['blink', 'cmsg', 1600]] },
        { say: '초록색 <b>Commit changes</b> 버튼을 누릅니다.', do: [['blink', 'commit', 1000], ['click', 'commit'], ['screen', 'ghRepo']] },
        { say: '저장소에 api, public, README.md, vercel.json이 보이면 성공입니다.', do: [['check', 'r-api', 300], ['check', 'r-public', 300], ['check', 'r-readme', 300], ['check', 'r-json', 300]] },
        { say: '만약 폴더 하나만 보인다면 폴더째 올린 것입니다. 그때는 마무리의 문제 해결 방법을 참고하세요.', do: [['blink', 'files', 2000]] }
      ],
      mission: { text: '<b>Commit changes</b>를 누르고, 저장소 첫 화면에 네 가지가 보이는지 확인하세요.' }
    },

    /* ===== 3장 ===== */
    { id: 'vc-signup', ch: C3, title: 'Vercel 가입하기 (GitHub 계정으로)',
      segs: [
        { say: '이제 Vercel 차례입니다. 주소창에 vercel.com/signup 을 입력합니다.', do: [['screen', 'vcSignup', { step: 'plan' }], ['blink', 'addr', 1600]] },
        { say: '먼저 요금제 종류를 묻습니다. <b>I’m working on personal projects</b>, 즉 개인 프로젝트를 고르면 무료인 <b>Hobby</b> 요금제가 됩니다.', do: [['click', 'planHobby'], ['check', 'planHobby']] },
        { say: '아래쪽 commercial projects는 회사나 돈을 버는 용도의 유료 Pro 요금제입니다. 매매일지는 개인용이니 Hobby면 충분합니다.', do: [['blink', 'planPro', 2400]] },
        { say: '<b>Your Name</b>에 이름을 적고 <b>Continue</b>를 누릅니다.', do: [['click', 'vName'], ['type', 'vName', '홍길동'], ['click', 'vCont'], ['screen', 'vcSignup', { step: 'provider' }]] },
        { say: '가입 방법 중 <b>Continue with GitHub</b>를 고르면, 방금 만든 GitHub 계정으로 바로 가입되고 연결도 쉬워집니다.', do: [['blink', 'vGh', 1500], ['click', 'vGh'], ['screen', 'ghAuth']] },
        { say: 'GitHub가 Vercel에 내 계정 정보를 알려 줘도 되는지 묻습니다. <b>Authorize Vercel</b>을 누릅니다.', do: [['blink', 'authorize', 1200], ['click', 'authorize'], ['check', 'authorize']] },
        { say: '그다음 휴대폰 번호 확인처럼 본인 확인 단계가 나오면 안내에 따라 진행합니다.', do: [] }
      ],
      mission: { text: 'Vercel에 <b>Hobby</b>(개인 프로젝트)로, <b>GitHub 계정으로</b> 가입하세요.', links: [['Vercel 가입', 'https://vercel.com/signup']] },
      tip: 'Hobby 요금제는 결제 수단을 등록하지 않아도 돼요. 무료 한도를 넘으면 돈이 나가는 게 아니라 <b>기능이 잠시 멈춰요</b>. (7장에서 자세히)'
    },
    { id: 'vc-tour', ch: C3, title: 'Vercel 첫 화면 둘러보기',
      segs: [
        { say: '가입이 끝나면 대시보드가 열립니다. 위쪽 <b>hong-trader’s projects</b>가 내 팀 이름입니다. 혼자 써도 팀이라고 부르고, 옆에 요금제 Hobby가 표시됩니다.', do: [['screen', 'vcHome'], ['blink', 'teamSw', 2600]] },
        { say: '왼쪽 사이드바의 <b>Projects</b>는 내가 올린 웹사이트, 즉 프로젝트 목록입니다. 가장 자주 오는 곳입니다.', do: [['blink', 'side-projects', 1600]] },
        { say: '<b>Deployments</b>는 모든 프로젝트의 배포 기록을, <b>Logs</b>는 서버 함수 기록을 한곳에서 봅니다. <b>Observability</b>는 사이트가 얼마나 빠르고 잘 동작하는지 보여 주는 관찰 도구입니다.', do: [['blink', 'side-tdeploys', 1400], ['blink', 'side-tlogs', 1400], ['blink', 'side-obs', 1600]] },
        { say: '<b>Domains</b>는 내가 산 도메인, 즉 나만의 주소를 관리하는 곳입니다. vercel.app 주소만 쓴다면 몰라도 됩니다.', do: [['blink', 'side-domains', 1800]] },
        { say: '<b>Integrations</b>는 외부 서비스를 붙이는 확장 기능, <b>Storage</b>는 데이터베이스 같은 저장 공간, <b>AI Gateway</b>는 여러 AI 모델을 한곳에서 쓰는 기능입니다. 오늘은 쓰지 않습니다.', do: [['blink', 'side-int', 1300], ['blink', 'side-storage', 1300], ['blink', 'side-ai', 1300]] },
        { say: '<b>Usage</b>는 무료 사용량을 얼마나 썼는지 보는 곳으로 7장에서 자세히 봅니다. <b>Settings</b>는 팀 이름, 알림 같은 팀 전체 설정입니다.', do: [['blink', 'side-usage', 1600], ['blink', 'side-tset', 1400]] },
        { say: '가운데에는 첫 프로젝트를 올리는 두 가지 방법이 보입니다. GitHub에서 가져오는 <b>Import Git Repository</b>와, 견본으로 시작하는 <b>Clone Template</b>입니다.', do: [['blink', 'cImport', 1500], ['blink', 'cTpl', 1500]] }
      ],
      mission: { text: 'Vercel 대시보드의 왼쪽 메뉴를 하나씩 눌러 보며 어떤 화면인지 둘러보세요.', links: [['Vercel 열기', 'https://vercel.com/dashboard']] },
      tip: MENU_TIP + ' 예전 화면에서는 메뉴가 사이드바가 아니라 <b>위쪽 탭</b>으로 보일 수 있어요. 이름은 같습니다.'
    },
    { id: 'vc-add', ch: C3, title: '새 프로젝트 추가하기',
      segs: [
        { say: '오른쪽 위의 <b>Add New…</b> 버튼을 누르면 드롭다운 메뉴가 열립니다.', do: [['screen', 'vcHome'], ['click', 'addNew'], ['show', 'addMenu']] },
        { say: '<b>Project</b>는 GitHub 저장소를 가져와 새 웹사이트를 만듭니다. 오늘 쓸 메뉴입니다.', do: [['blink', 'mProj', 1800]] },
        { say: '<b>Domain</b>은 나만의 주소를 사거나 연결하고, <b>Store</b>는 데이터베이스 같은 저장소를 만들고, <b>Team</b>은 여러 사람이 함께 쓰는 새 팀을 만듭니다.', do: [['blink', 'mDomain', 1300], ['blink', 'mStore', 1300], ['blink', 'mTeam', 1300]] },
        { say: '<b>Project</b>를 선택합니다.', do: [['click', 'mProj']] }
      ],
      mission: { text: '<b>Add New… ▾ › Project</b>를 누르세요. (가운데의 Import Git Repository를 눌러도 같은 화면이 열려요)', links: [['새 프로젝트', 'https://vercel.com/new']] }
    },
    { id: 'vc-connect', ch: C3, title: 'GitHub 연결하고 저장소 권한 주기',
      segs: [
        { say: '새 프로젝트 화면입니다. 왼쪽 <b>Import Git Repository</b> 상자에서 <b>Continue with GitHub</b>를 누릅니다.', do: [['screen', 'vcNew', { state: 'noapp' }], ['blink', 'impBox', 1600], ['click', 'impGh'], ['screen', 'ghInstall']] },
        { say: '처음 한 번은 Vercel이 내 GitHub의 어떤 저장소를 볼 수 있게 할지 정합니다.', do: [['blink', 'repoBox', 2000]] },
        { say: '<b>Only select repositories</b>, 즉 고른 저장소만을 선택하고,', do: [['click', 'only'], ['on', 'only']] },
        { say: '<b>Select repositories</b>를 눌러 stock-journal을 고릅니다.', do: [['click', 'sel'], ['show', 'chip'], ['check', 'chip']] },
        { say: '<b>Install & Authorize</b> 버튼을 누르면 연결이 끝납니다.', do: [['click', 'install']] }
      ],
      mission: { text: '<b>Continue with GitHub</b>를 누르고, <b>Only select repositories</b>에서 내 저장소를 선택한 뒤 <b>Install</b>(또는 Install & Authorize)를 누르세요. GitHub 비밀번호를 다시 물을 수 있어요.' },
      tip: 'All repositories를 골라도 동작하지만, 필요한 저장소만 허락하는 쪽이 더 안전해요. 열쇠를 집 전체가 아니라 방 하나만 맡기는 것과 같아요.'
    },
    { id: 'vc-pick', ch: C3, title: '저장소 고르기 (Import)',
      segs: [
        { say: 'Vercel로 돌아오면 저장소 목록이 보입니다. 저장소가 많으면 검색 칸에 이름을 입력합니다.', do: [['screen', 'vcNew', { state: 'list' }], ['blink', 'pickRow', 1800]] },
        { say: 'stock-journal 오른쪽의 <b>Import</b> 버튼을 누릅니다.', do: [['blink', 'pickRepo', 1200], ['click', 'pickRepo']] },
        { say: '목록에 저장소가 보이지 않으면 아래쪽의 <b>Adjust GitHub App Permissions</b>를 눌러 저장소 권한을 다시 주면 됩니다.', do: [['screen', 'vcNew', { state: 'list' }], ['blink', 'cfgLink', 2200]] }
      ],
      mission: { text: '목록에서 내 저장소의 <b>Import</b>를 누르세요.' }
    },
    { id: 'vc-review', ch: C3, title: '설정 항목 하나씩 이해하기',
      segs: [
        { say: '마지막 확인 화면, <b>New Project</b>입니다. 항목이 많아 보이지만 우리는 거의 그대로 둡니다. 각각 무슨 뜻인지 알아 두면 나중에 다른 앱을 올릴 때도 도움이 됩니다.', do: [['screen', 'vcConfig', {}], ['blink', 'importFrom', 1800]] },
        { say: '<b>Vercel Team</b>은 이 프로젝트가 들어갈 팀입니다. 팀이 하나뿐이면 그대로 둡니다.', do: [['blink', 'team', 1600]] },
        { say: '<b>Project Name</b>은 프로젝트 이름이자 처음 생기는 주소의 앞부분입니다. 이미 누가 쓰는 이름이면 주소 뒤에 임의의 글자가 붙습니다. 주소는 나중에 바꿀 수 있습니다.', do: [['blink', 'projName', 2600]] },
        { say: '<b>Framework Preset</b>은 앱을 무엇으로 만들었는지 고르는 칸입니다. Next.js나 리액트로 만든 앱이면 그 이름을 고르지만, 우리 앱은 순수한 HTML이라 <b>Other</b>, 즉 기타 그대로 둡니다.', do: [['blink', 'preset', 3000], ['check', 'preset']] },
        { say: '<b>Root Directory</b>는 Vercel이 작업을 시작할 폴더입니다. 파일이 저장소 맨 위에 있으면 점 슬래시 그대로 둡니다. 저장소 안에 폴더가 한 겹 더 있을 때만 Edit으로 그 폴더를 고릅니다.', do: [['blink', 'root', 3000]] },
        { say: '<b>Build and Output Settings</b>를 펼쳐 보겠습니다.', do: [['click', 'bos'], ['screen', 'vcConfig', { open: true }], ['blink', 'bos', 1200]] },
        { say: '<b>Build Command</b>는 완성품을 만드는 명령어입니다. 리액트처럼 만들기 과정이 필요한 앱만 적고, 우리 앱은 필요 없습니다.', do: [['blink', 'bCmd', 2400]] },
        { say: '<b>Output Directory</b>는 실제로 인터넷에 공개할 폴더입니다. 우리는 public 폴더인데, vercel.json에 이미 적혀 있어서 <b>Override 스위치를 켜지 않아도</b> 됩니다.', do: [['blink', 'oDir', 3000], ['check', 'oDir']] },
        { say: '<b>Install Command</b>는 부품을 내려받는 명령어로, 역시 우리 앱에는 필요 없습니다. 서버 함수는 api 폴더 규칙 덕분에 따로 적는 칸이 없습니다.', do: [['blink', 'iCmd', 2400]] },
        { say: '<b>Environment Variables</b>는 비밀 값을 넣는 곳입니다. 지금 넣어도 되지만, 5장에서 따로 연습하겠습니다.', do: [['blink', 'envSec', 2000]] }
      ],
      tip: '<b>언제 바꾸나요?</b><ul><li><b>Framework Preset</b>: Next.js·Vite 등으로 만든 앱일 때 (대개 자동으로 골라져요)</li><li><b>Root Directory</b>: 저장소 안에 폴더가 한 겹 더 있을 때 (예: 폴더째 올림)</li><li><b>Build / Output</b>: React·Vue 등 → <code>npm run build</code> / <code>dist</code></li></ul>순수 HTML 앱은 공개 폴더(Output Directory)만 맞으면 됩니다. 우리는 <code>vercel.json</code>이 대신 알려 줘요.'
    },
    { id: 'vc-deploy', ch: C3, title: '배포 버튼 누르기',
      segs: [
        { say: '확인이 끝났으면 Framework Preset이 Other, Root Directory가 점 슬래시인지 다시 한 번 봅니다.', do: [['screen', 'vcConfig', {}], ['check', 'preset'], ['check', 'root']] },
        { say: '맨 아래 <b>Deploy</b> 버튼을 누릅니다.', do: [['blink', 'deploy', 1200], ['click', 'deploy']] }
      ],
      mission: { text: 'Framework Preset <b>Other</b>, Root Directory <code>./</code>를 확인하고 <b>Deploy</b> 버튼을 누르세요.' },
      warn: 'Build and Output Settings의 <b>Override</b> 스위치는 켜지 마세요. 잘못된 폴더 이름을 적으면 배포가 실패해요. (마무리의 “문제 해결 ①” 참고)'
    },

    /* ===== 4장 ===== */
    { id: 'vc-building', ch: C4, title: '배포 진행 지켜보기',
      segs: [
        { say: '배포가 시작되었습니다. 노란 점과 함께 <b>Building</b>으로 표시되는 동안 Vercel이 파일과 서버 함수를 올리고 있습니다.', do: [['screen', 'vcDeploying', {}], ['blink', 'status', 1800], ['blink', 'log', 2400]] },
        { say: '보통 30초 안팎이면 끝납니다.', do: [['wait', 600], ['screen', 'vcDeploying', { state: 'done' }]] },
        { say: '<b>Congratulations!</b> 축하 화면이 나오면 성공입니다. 가운데 <b>Domains</b>에 보이는 주소가 바로 내 앱의 웹 주소입니다.', do: [['blink', 'congrats', 1600], ['blink', 'url', 2000], ['check', 'url']] },
        { say: '<b>Continue to Dashboard</b>를 누르면 프로젝트 화면으로 갑니다.', do: [['click', 'toDash']] }
      ],
      warn: '<b>Error</b>가 뜨면 빨간 글씨의 Build Logs를 확인하세요. 대부분 폴더 위치나 Output 설정 문제예요. (마무리의 “문제 해결 ①” 참고)'
    },
    { id: 'vc-open', ch: C4, title: '내 앱 열어 보기',
      segs: [
        { say: '프로젝트의 <b>Overview</b> 화면입니다. <b>Production Deployment</b> 상자의 Domains 주소를 눌러 봅니다.', do: [['screen', 'vcOverview', {}], ['blink', 'prodTile', 1600], ['click', 'url'], ['screen', 'appPC']] },
        { say: '축하합니다! 매매일지가 인터넷에 올라갔습니다. 이제 이 주소만 있으면 어디서든 열 수 있습니다.', do: [['blink', 'addr', 1800], ['check', 'app']] },
        { say: '기록한 데이터는 서버가 아니라 <b>각자의 브라우저</b>에 저장됩니다. 그래서 주소를 다른 사람에게 알려 줘도 내 일지는 보이지 않습니다.', do: [] }
      ],
      mission: { text: 'Overview의 <b>Domains</b> 주소(또는 오른쪽 위 <b>Visit</b>)를 눌러 매매일지가 열리는지 확인하세요. 기록을 하나 써 봐도 좋아요.' },
      tip: '현재가 조회는 NH투자증권 키가 있어야 동작해요. 키가 없으면 종목 수정 화면에서 현재가를 직접 입력하면 됩니다.',
      warn: 'Deployment 칸의 긴 주소(<code>…-git-main-….vercel.app</code> 같은 것)는 <b>Vercel 로그인을 요구</b>할 수 있어요(배포 보호 기능). 다른 사람에게 알려 줄 때와 휴대폰에서는 꼭 <b>Domains</b>의 짧은 주소를 쓰세요.'
    },
    { id: 'vc-proj-tour', ch: C4, title: '프로젝트 메뉴 둘러보기',
      segs: [
        { say: '프로젝트에 들어오면 왼쪽 사이드바가 프로젝트 전용 메뉴로 바뀝니다. 맨 위 팀 이름을 누르면 팀 화면으로 돌아갑니다.', do: [['screen', 'vcOverview', {}], ['blink', 'projHead', 2200]] },
        { say: '<b>Overview</b>는 프로젝트의 첫 화면입니다. 주소, 최근 배포 상태, 그리고 되돌리기 버튼이 모여 있습니다.', do: [['blink', 'side-ov', 1800]] },
        { say: '<b>Deployments</b>는 배포 기록입니다. 언제 무엇이 올라갔는지 보고, 다시 배포하거나 예전 버전으로 되돌릴 수 있습니다.', do: [['blink', 'side-deploys', 2000]] },
        { say: '<b>Logs</b>는 서버 함수가 일한 기록입니다. 현재가 조회가 안 될 때 원인을 찾는 곳입니다.', do: [['blink', 'side-logs', 1800]] },
        { say: '<b>Analytics</b>는 방문자 통계, <b>Speed Insights</b>는 사이트 속도 측정, <b>Observability</b>는 더 자세한 운영 기록입니다. 켜서 쓰는 선택 기능입니다.', do: [['blink', 'side-ana', 1300], ['blink', 'side-speed', 1300], ['blink', 'side-pobs', 1300]] },
        { say: '<b>Firewall</b>은 나쁜 접속을 막는 방화벽, <b>Storage</b>는 데이터 저장소, <b>Flags</b>는 기능을 켜고 끄는 스위치, <b>AI Gateway</b>는 AI 모델 연결 기능입니다. 오늘은 쓰지 않습니다.', do: [['blink', 'side-fw', 1100], ['blink', 'side-pstore', 1100], ['blink', 'side-flags', 1100], ['blink', 'side-pai', 1100]] },
        { say: '<b>Settings</b>는 이름, 주소, 환경 변수 같은 모든 설정이 모인 곳입니다. 바로 다음 단계에서 주소를 바꿀 때 씁니다.', do: [['blink', 'side-set', 2000]] }
      ],
      mission: { text: '내 프로젝트의 왼쪽 메뉴를 하나씩 눌러 보세요. 눌러 보기만 해서는 아무것도 바뀌지 않아요.' },
      tip: MENU_TIP
    },
    { id: 'vc-rename', ch: C4, title: '주소(도메인) 바꾸기',
      segs: [
        { say: '주소에 붙은 임의의 글자를 기억하기 쉬운 이름으로 바꿔 보겠습니다. 왼쪽 메뉴에서 <b>Settings</b>를 누릅니다.', do: [['screen', 'vcOverview', {}], ['click', 'side-set'], ['screen', 'vcSettingsGeneral']] },
        { say: '설정 화면 안에 또 하나의 메뉴가 생겼습니다. <b>General</b>은 기본 정보, <b>Build and Deployment</b>는 3장에서 본 빌드와 공개 폴더 설정, <b>Domains</b>는 주소 관리입니다.', do: [['blink', 'sub-general', 1400], ['blink', 'sub-build', 1600], ['blink', 'sub-domains', 1400]] },
        { say: '<b>Environment Variables</b>는 5장에서 쓸 비밀 값, <b>Git</b>은 GitHub 연결, <b>Deployment Protection</b>은 배포를 로그인한 사람만 보게 하는 보호 기능, <b>Functions</b>는 서버 함수 설정입니다.', do: [['blink', 'envNav', 1300], ['blink', 'sub-git', 1100], ['blink', 'sub-protect', 1500], ['blink', 'sub-fn', 1200]] },
        { say: '여기서 주의할 점이 있습니다. General의 <b>Project Name</b>을 바꿔도 대시보드의 이름만 바뀌고, <b>웹 주소는 그대로</b>입니다.', do: [['blink', 'pnameCard', 3000]] },
        { say: '주소를 바꾸려면 <b>Domains</b>로 갑니다.', do: [['click', 'sub-domains'], ['screen', 'vcDomains', {}], ['blink', 'domRow', 1600]] },
        { say: '지금 쓰는 vercel.app 주소 오른쪽의 <b>Edit</b> 버튼을 누릅니다.', do: [['click', 'editDom'], ['show', 'dlg']] },
        { say: '새 이름을 입력합니다. 예를 들어 hong-stock-journal처럼 영어 소문자, 숫자, 하이픈으로 정합니다.', do: [['click', 'nameInp'], ['type', 'nameInp', 'hong-stock-journal']] },
        { say: '<b>Save</b>를 누르면 주소가 hong-stock-journal.vercel.app 으로 바뀝니다. 다른 사람이 이미 쓰는 이름이면 다른 이름을 고르세요.', do: [['click', 'saveName'], ['screen', 'vcDomains', { renamed: true }], ['check', 'domName']] }
      ],
      mission: { text: '<b>Settings › Domains</b>에서 <code>○○.vercel.app</code> 주소의 <b>Edit</b>을 눌러 기억하기 쉬운 이름으로 바꾸세요. 바뀐 주소를 메모해 두세요.' },
      warn: '주소가 바뀌면 브라우저 저장 공간도 새로 시작돼요. 이전 주소에서 이미 기록을 했다면 ⚙️ 설정의 <b>백업 데이터 복사</b>로 옮기세요.'
    },

    /* ===== 5장 ===== */
    { id: 'env-intro', ch: C5, title: '환경 변수란? 왜 필요할까?',
      segs: [
        { say: '<b>환경 변수</b>는 프로그램 파일 밖에 따로 적어 두는 설정 값입니다. 식당에 비유해 보겠습니다.', do: [['screen', 'envIntro']] },
        { say: 'GitHub에 올린 코드 파일은 손님 누구나 볼 수 있는 <b>메뉴판</b>과 같습니다. 저장소를 비공개로 해도, 한 번 올라간 내용은 기록에 계속 남습니다.', do: [['blink', 'eMenu', 3200]] },
        { say: '환경 변수는 <b>사장님 주머니 속 수첩</b>입니다. 금고 비밀번호처럼 남이 보면 안 되는 값은 메뉴판이 아니라 이 수첩, 즉 Vercel에 적어 둡니다. 서버 함수만 몰래 꺼내 볼 수 있습니다.', do: [['blink', 'eNote', 3600]] },
        { say: '왜 필요할까요? 첫째, <b>비밀을 지킬 수 있습니다</b>. API 키가 새어 나가면 남이 내 이름으로 서비스를 쓰고, 요금이 청구될 수도 있습니다.', do: [['blink', 'r1', 2600], ['check', 'r1']] },
        { say: '둘째, <b>코드를 고치지 않고 값만 바꿀 수 있습니다</b>. 도어락 비밀번호를 바꾸려고 문을 새로 달지 않는 것과 같습니다.', do: [['blink', 'r2', 2400], ['check', 'r2']] },
        { say: '셋째, 실제 주소인 Production과 미리보기인 Preview처럼 <b>환경마다 서로 다른 값</b>을 넣을 수 있습니다.', do: [['blink', 'r3', 2400], ['check', 'r3']] },
        { say: '그럼 없어도 될까요? 매매일지의 기록, 일기, 자산 계산처럼 브라우저 안에서 하는 기능은 환경 변수가 없어도 잘 동작합니다.', do: [['blink', 'n1', 2600]] },
        { say: '하지만 현재가 조회, 공시, AI 요약처럼 바깥 서비스와 연결하는 기능은 열쇠, 즉 <b>키</b>가 있어야 동작합니다. 필요한 기능만 골라서 넣으면 됩니다.', do: [['blink', 'n2', 2800]] }
      ],
      tip: '매매일지에 넣을 수 있는 값: <code>ACCESS_CODE</code>(접근 코드, 권장), <code>NHPLUG_APP_KEY</code>·<code>NHPLUG_APP_SECRET</code>(현재가), <code>DART_API_KEY</code>(공시), <code>ANTHROPIC_API_KEY</code>(AI 요약, 유료). 자세한 설명은 매매일지 폴더의 README.md에 있어요.'
    },
    { id: 'env-access', ch: C5, title: 'ACCESS_CODE는 무엇인가요?',
      segs: [
        { say: '이번에 넣을 <b>ACCESS_CODE</b>는 매매일지에 들어 있는 문지기 비밀번호입니다. 아파트 공동현관 비밀번호를 떠올리면 쉽습니다.', do: [['screen', 'envAccess']] },
        { say: '내 앱이 현재가를 물어볼 때, 앱은 내가 입력해 둔 접근 코드를 함께 보냅니다.', do: [['blink', 'acApp', 2200]] },
        { say: '서버 함수는 문 앞에서 그 코드를 Vercel에 저장된 ACCESS_CODE와 비교합니다.', do: [['blink', 'acGate', 2200]] },
        { say: '코드가 맞으면 문을 열어 NH투자증권에 현재가를 조회해 줍니다.', do: [['blink', 'acNH', 1800], ['check', 'acNH']] },
        { say: '주소만 알아낸 다른 사람은 코드를 모르니 문 앞에서 “접근 코드가 필요해요”라는 말과 함께 거절됩니다.', do: [['blink', 'acStranger', 1500], ['blink', 'acNo', 1800]] },
        { say: 'ACCESS_CODE를 넣지 않으면 문이 활짝 열린 것과 같습니다. 주소를 아는 누구나 내 키로 조회할 수 있고, 유료인 AI 요약 키를 넣었다면 요금이 나에게 청구될 수 있습니다. 그래서 다른 키보다 ACCESS_CODE를 먼저 넣는 것을 권합니다.', do: [['blink', 'acQ', 4000]] }
      ],
      tip: '<b>좋은 접근 코드 만들기</b>: 영어와 숫자를 섞어 10자 이상, 다른 사이트 비밀번호와 다르게. 앱에서는 처음 조회할 때 한 번만 입력하면 그 기기에 기억돼요. (휴대폰·PC 각각 한 번씩)'
    },
    { id: 'env-add', ch: C5, title: 'ACCESS_CODE 추가하기',
      segs: [
        { say: '<b>Settings</b>의 <b>Environment Variables</b> 메뉴로 들어갑니다.', do: [['screen', 'vcEnv'], ['blink', 'envNav', 1500], ['blink', 'envForm', 1500]] },
        { say: '<b>Key</b>, 즉 이름 칸에는 ACCESS_CODE를 대문자 그대로 입력합니다.', do: [['click', 'key'], ['type', 'key', 'ACCESS_CODE']] },
        { say: '<b>Value</b>, 즉 값 칸에는 나만 아는 코드를 입력합니다.', do: [['click', 'val'], ['type', 'val', 'my-secret-2026']] },
        { say: '<b>Environments</b>는 이 값을 어느 환경에서 쓸지 정합니다. 실제 주소인 Production, 미리보기인 Preview, 개발용 Development 모두에서 쓰도록 <b>All Environments</b> 그대로 둡니다.', do: [['blink', 'envs', 2800]] },
        { say: '<b>Save</b>를 누르면 저장됩니다. 값은 점으로 가려서 보여 줍니다.', do: [['click', 'saveVar'], ['hide', 'varEmpty'], ['show', 'varRow'], ['check', 'varRow']] },
        { say: '아래쪽에 “새 배포가 필요하다”는 안내가 뜹니다. 이 안내의 <b>Redeploy</b>를 눌러도 되지만, 다음 단계에서 배포 화면을 보면서 해 보겠습니다.', do: [['show', 'toast'], ['blink', 'toast', 2600]] }
      ],
      mission: { text: 'Key <code>ACCESS_CODE</code>, Value는 <b>나만 아는 코드</b>로 환경 변수를 추가하세요. (교재의 예시 코드를 그대로 쓰지 마세요)' },
      warn: 'Key는 철자와 대소문자가 정확해야 해요. <code>ACCESS_CODE</code> (밑줄 포함, 모두 대문자)'
    },
    { id: 'env-redeploy', ch: C5, title: '다시 배포해서 적용하기',
      segs: [
        { say: '환경 변수는 <b>다시 배포해야</b> 적용됩니다. 왼쪽 메뉴의 <b>Deployments</b>로 갑니다.', do: [['screen', 'vcEnv'], ['click', 'side-deploys'], ['screen', 'vcDeployments', {}]] },
        { say: 'Deployments 화면을 짚어 보겠습니다. 한 줄이 배포 한 번이고, 맨 위가 가장 최근입니다. <b>Production</b>은 실제 주소에 공개된 배포, <b>Current</b>는 지금 손님에게 보이는 배포라는 뜻입니다.', do: [['blink', 'depList', 3000]] },
        { say: '위쪽 필터로는 브랜치, 환경, 성공과 실패 같은 상태별로 골라 볼 수 있습니다.', do: [['blink', 'depFilter', 1800]] },
        { say: '맨 위 배포 줄의 오른쪽 끝, 점 세 개 버튼을 누릅니다.', do: [['click', 'oldRowDots'], ['show', 'dotMenu']] },
        { say: '<b>Redeploy</b>는 같은 파일로 다시 배포합니다. <b>Promote</b>는 미리보기 배포를 실제 주소로 올리고, <b>Instant Rollback</b>은 예전 버전으로 되돌립니다. 7장에서 다시 봅니다.', do: [['blink', 'mRedeploy', 1400], ['blink', 'mPromote', 1300], ['blink', 'mRollback', 1300]] },
        { say: '<b>Redeploy</b>를 선택합니다.', do: [['click', 'mRedeploy'], ['hide', 'dotMenu'], ['show', 'rdDlg']] },
        { say: '확인 창이 뜹니다. <b>Use existing Build Cache</b>는 지난번 만든 임시 파일을 다시 쓰는 옵션으로, 그대로 두면 됩니다. 배포가 이상하게 꼬였을 때만 체크를 풉니다.', do: [['blink', 'cacheChk', 2600]] },
        { say: '<b>Redeploy</b> 버튼을 누릅니다.', do: [['click', 'rdGo'], ['hide', 'rdDlg'], ['show', 'newRow'], ['set', 'newRowSt', BUSY], ['blink', 'newRow', 1500]] },
        { say: '새 배포가 <b>Ready</b>가 되면 끝입니다. 이제 앱에서 현재가를 처음 조회할 때 접근 코드를 한 번 물어봅니다.', do: [['set', 'newRowSt', READY], ['check', 'newRow']] }
      ],
      mission: { text: '<b>Deployments › 맨 위 배포의 ⋯ › Redeploy</b>로 다시 배포하고 Ready가 되는지 확인하세요.' }
    },

    /* ===== 6장 ===== */
    { id: 'gh-edit', ch: C6, title: 'GitHub에서 파일 고치기',
      segs: [
        { say: '앱을 고치고 싶을 때는 GitHub의 파일만 바꾸면 됩니다. 예시로 public 폴더의 index.html을 열어 버전 번호를 바꿔 보겠습니다.', do: [['screen', 'ghFile', {}], ['blink', 'line', 2200]] },
        { say: '오른쪽 위의 연필 모양 버튼을 누르면 편집 화면이 됩니다.', do: [['click', 'pencil'], ['screen', 'ghFile', { edit: true }]] },
        { say: '<b>APP_VER</b> 값을 v1.8로 고칩니다.', do: [['click', 'ver'], ['type', 'ver', 'v1.8'], ['check', 'line']] },
        { say: '초록색 <b>Commit changes</b> 버튼을 누르고, 나타난 창에서 한 번 더 <b>Commit changes</b>를 누릅니다.', do: [['click', 'commitBtn'], ['show', 'cdlg'], ['click', 'cconf']] }
      ],
      mission: { text: '저장소에서 <code>public/index.html</code>을 열고 ✏️ 버튼으로 <code>APP_VER</code>를 바꾼 뒤 커밋해 보세요. (Ctrl+F로 APP_VER를 찾을 수 있어요)' },
      tip: '여러 파일을 크게 고쳤다면 PC에서 고친 뒤 저장소의 <b>Add file › Upload files</b>로 같은 이름의 파일을 다시 올리면 덮어써요. 여러 개를 <b>한 번에</b> 올리면 배포도 한 번만 일어나요.'
    },
    { id: 'auto-deploy', ch: C6, title: '자동 배포 확인하기',
      segs: [
        { say: 'Vercel의 <b>Deployments</b> 화면을 보면 새 배포가 저절로 시작되어 있습니다.', do: [['screen', 'vcDeployments', { auto: true }], ['blink', 'newRow', 2000]] },
        { say: 'GitHub의 main 갈래에 저장할 때마다 Vercel이 알아서 다시 배포해 줍니다. 이것을 <b>자동 배포</b>라고 합니다.', do: [['wait', 500], ['set', 'newRowSt', READY], ['check', 'newRow']] },
        { say: 'GitHub 저장소 화면 오른쪽에도 <b>Deployments</b> 표시가 생겨, 어느 커밋이 배포되었는지 알 수 있습니다.', do: [['screen', 'ghRepo', { deployed: true }], ['wait', 1600]] },
        { say: '휴대폰에 설치한 앱은 한두 번 닫았다가 다시 열면 새 버전으로 바뀝니다.', do: [] }
      ],
      mission: { text: 'Vercel Deployments 화면에서 “Update index.html” 배포가 Ready가 되는지 확인하세요.' }
    },

    /* ===== 7장 Vercel 더 잘 쓰기 ===== */
    { id: 'vc-log', ch: C7, title: '배포 상세 화면과 빌드 로그 읽기',
      segs: [
        { say: '이번 장에서는 Vercel을 더 잘 쓰는 방법을 알아봅니다. 먼저 배포가 어떻게 진행됐는지 자세히 보려면, Deployments 목록에서 배포 한 줄을 누릅니다.', do: [['screen', 'vcDeployments', { history: true }], ['click', 'newRow'], ['screen', 'vcDeployDetail', {}]] },
        { say: '배포 상세 화면입니다. 위쪽에 상태, 연결된 주소, 브랜치와 커밋 메시지, 걸린 시간이 보입니다.', do: [['blink', 'dHead', 2200]] },
        { say: '<b>Build Logs</b>는 Vercel이 한 일을 한 줄씩 적은 작업 일지입니다. 실패했을 때는 여기에 빨간 글씨로 이유가 나옵니다.', do: [['blink', 'dlog', 2600]] },
        { say: '<b>Deployment Summary</b>는 결과 요약입니다. 화면 파일 몇 개와 서버 함수 네 개가 올라갔는지 알려 줍니다.', do: [['blink', 'dsum', 2400]] },
        { say: '<b>Source</b>에서는 실제로 공개된 파일 목록을 확인할 수 있습니다. 파일이 빠졌는지 볼 때 유용합니다. <b>Visit</b>을 누르면 이 배포를 바로 열어 볼 수 있습니다.', do: [['blink', 'dsrc', 1800], ['blink', 'visitBtn', 1400]] }
      ],
      mission: { text: '<b>Deployments</b>에서 가장 위의 배포를 눌러 Build Logs와 Deployment Summary를 읽어 보세요.' }
    },
    { id: 'vc-rollback', ch: C7, title: '이전 버전으로 되돌리기 (Instant Rollback)',
      segs: [
        { say: '고친 버전에 문제가 생겼다면 걱정하지 마세요. Vercel은 예전 배포를 보관하고 있어서 클릭 몇 번으로 되돌릴 수 있습니다. Overview의 <b>Instant Rollback</b>을 누릅니다.', do: [['screen', 'vcOverview', { renamed: true, updated: true }], ['click', 'rollBtn'], ['screen', 'vcRollback']] },
        { say: '무료 Hobby 요금제는 <b>바로 이전</b> 실제 배포로만 되돌릴 수 있습니다. 되돌아갈 배포를 확인하고,', do: [['blink', 'rbTarget', 2400]] },
        { say: '<b>Continue</b>를 누른 뒤 확인 창에서 한 번 더 확인하면, 새로 만드는 과정이 없어서 몇 초 만에 예전 버전이 공개됩니다.', do: [['click', 'rbGo'], ['screen', 'vcOverview', { renamed: true, rolledback: true }], ['blink', 'status', 1800]] },
        { say: '주의할 점이 있습니다. 되돌리면 <b>자동 공개가 꺼집니다</b>. 그래서 GitHub에 새로 저장해도 실제 주소에는 바로 올라가지 않습니다. 문제를 고치는 동안 예전 버전이 그대로 유지되는 것이지요.', do: [['blink', 'prodTile', 3200]] },
        { say: '다 고친 다음에는 Production Deployment 상자의 <b>Manage</b>를 눌러 최신 배포를 고르고 확인하면, 자동 공개가 다시 켜집니다.', do: [['blink', 'manage', 2400]] }
      ],
      mission: { text: 'Overview의 <b>Instant Rollback</b>으로 되돌려 보고, 확인한 뒤 <b>Manage</b>로 최신 배포를 다시 공개해 자동 공개를 켜세요.' },
      tip: '되돌린 상태에서는 <b>새 커밋이 자동으로 공개되지 않아요</b>. “고쳤는데 왜 안 바뀌지?” 싶으면 Overview에 Manage 버튼이 있는지 확인하세요.'
    },
    { id: 'vc-funclog', ch: C7, title: '서버 함수 로그 보기',
      segs: [
        { say: '현재가 조회처럼 서버 함수가 하는 일이 잘 안 될 때는 왼쪽 메뉴의 <b>Logs</b>에서 기록을 봅니다.', do: [['screen', 'vcOverview', { renamed: true }], ['click', 'side-logs'], ['screen', 'vcLogs']] },
        { say: '왼쪽 필터의 <b>Function</b>에 api/price 같은 서버 함수 네 개가 보입니다. 1장에서 본 api 폴더의 파일들입니다. 현재가 담당인 price만 골라 봅니다.', do: [['blink', 'logFilter', 2000], ['blink', 'fPrice', 1600]] },
        { say: '앱에서 현재가를 조회할 때마다 줄이 하나씩 생깁니다. 200은 성공이라는 뜻이고, 오류가 나면 이유가 보입니다. 예를 들어 401 접근 코드가 필요해요는 앱에 입력한 코드가 ACCESS_CODE와 다르다는 뜻입니다.', do: [['blink', 'logList', 1600], ['blink', 'errRow', 3000]] },
        { say: '무료 요금제는 로그를 <b>1시간</b>만 보관합니다. 문제가 생기면 바로 앱에서 다시 조회해 보고 곧장 확인하세요.', do: [['blink', 'keep', 2400]] }
      ],
      mission: { text: '내 프로젝트의 <b>Logs</b>를 열고, 앱에서 현재가를 조회한 뒤 <code>/api/price</code> 줄이 생기는지 확인해 보세요.' },
      tip: MENU_TIP
    },
    { id: 'vc-notify', ch: C7, title: '배포 실패 알림 확인하기',
      segs: [
        { say: '배포가 실패했는데 모르고 지나치면 곤란하겠지요? 다행히 Vercel은 <b>배포 실패 알림이 처음부터 켜져</b> 있습니다. 어디서 바꾸는지 보겠습니다.', do: [['screen', 'vcNotify']] },
        { say: '팀 메뉴의 <b>Settings</b>에서 <b>My Notifications</b>를 엽니다.', do: [['blink', 'side-tset', 1200], ['blink', 'subNotify', 1600]] },
        { say: '<b>Deployment Failures</b>, 배포 실패 줄을 보면 대시보드 알림인 Web과 Email이 켜져 있습니다. 실패하면 가입한 이메일로 메일이 옵니다.', do: [['blink', 'nFail', 3000], ['check', 'nFail']] },
        { say: '<b>Deployment Ready</b>는 배포가 준비되었을 때 알려 주는 알림입니다. 필요하면 Email을 켜도 됩니다. Push는 휴대폰이나 PC 알림으로 받는 방법입니다.', do: [['blink', 'nReady', 2600]] },
        { say: '아래 Usage의 사용량 한도 알림도 꼭 켜 두세요. 무료 한도에 도달하면 알려 줍니다.', do: [['blink', 'usageNotif', 2000]] }
      ],
      mission: { text: '팀 <b>Settings › My Notifications</b>에서 <b>Deployment Failures</b>의 Email이 켜져 있는지 확인하세요.' },
      tip: '대시보드 오른쪽 위 🔔 종 모양을 누르면 받은 알림을 모아 볼 수 있어요. 웹에서 먼저 읽은 알림은 이메일로 다시 보내지 않아요.'
    },
    { id: 'vc-domain', ch: C7, title: '나만의 도메인 연결하기 (선택)',
      segs: [
        { say: 'vercel.app 대신 나만의 주소를 쓰고 싶다면 <b>Settings</b>의 <b>Domains</b>를 엽니다. 꼭 할 필요는 없는 선택 단계입니다.', do: [['screen', 'vcDomains', { renamed: true }], ['blink', 'domRow', 2000]] },
        { say: '지금 쓰는 vercel.app 주소는 무료로 계속 쓸 수 있습니다.', do: [['check', 'domName']] },
        { say: '<b>Buy</b>는 Vercel에서 새 도메인을 사는 방법입니다. 도메인은 1년 단위로 돈을 내야 합니다.', do: [['blink', 'buyDom', 2000]] },
        { say: '<b>Add Domain</b>은 가비아 같은 다른 곳에서 이미 산 도메인을 연결하는 방법입니다. 주소를 입력하면 도메인 회사 화면에서 바꿔야 할 DNS 값을 알려 주니, 그대로 입력하면 됩니다.', do: [['click', 'addDom'], ['show', 'addForm'], ['blink', 'addForm', 2600]] },
        { say: '<b>SSL 인증서</b>는 주소창 자물쇠, 즉 보안 연결입니다. Vercel이 무료로 자동 발급하고 갱신까지 해 줍니다.', do: [['hide', 'addForm'], ['blink', 'https', 2400], ['check', 'https']] }
      ],
      warn: '도메인 구매는 결제가 필요해요. 강의에서는 화면만 둘러보고, 필요할 때 진행하세요.'
    },
    { id: 'vc-usage', ch: C7, title: '무료 사용량 확인하기',
      segs: [
        { say: '마지막으로 무료로 얼마나 쓸 수 있는지 알아 두겠습니다. 팀 메뉴의 <b>Usage</b>를 엽니다.', do: [['screen', 'vcUsage'], ['blink', 'side-usage', 1400]] },
        { say: '무료 Hobby 요금제는 30일마다 넉넉한 한도를 줍니다. 한도를 넘으면 돈이 나가는 대신 <b>해당 기능이 멈추고</b>, 30일이 지나야 다시 쓸 수 있습니다.', do: [['blink', 'plan', 3000]] },
        { say: '방문자에게 보내는 데이터 양인 <b>Fast Data Transfer</b>는 100기가바이트, 접속 요청 수인 <b>CDN Requests</b>는 100만 번까지입니다.', do: [['blink', 'uData', 1800], ['blink', 'uReq', 1800]] },
        { say: '서버 함수는 실행 횟수 100만 번, 실제 계산 시간인 Active CPU 4시간 등이 주어집니다. 혼자 쓰는 매매일지라면 아주 적게 씁니다.', do: [['blink', 'uFn', 2800]] },
        { say: '배포는 하루에 100번까지 할 수 있습니다. 그래도 파일은 여러 개를 고친 뒤 <b>한 번에 저장</b>하는 습관이 좋습니다.', do: [['blink', 'uTip', 2400], ['check', 'uTip']] }
      ],
      mission: { text: '내 팀의 <b>Usage</b>를 열어 최근 사용량을 확인해 보세요.', links: [['Vercel 요금 안내', 'https://vercel.com/pricing'], ['Hobby 한도 안내', 'https://vercel.com/docs/plans/hobby']] },
      warn: '요금과 한도는 바뀔 수 있어요(2026년 11월 기준). 정확한 내용은 Usage 화면과 요금 안내 페이지를 확인하세요.'
    },

    /* ===== 8장 ===== */
    { id: 'phone-open', ch: C8, title: '휴대폰에서 주소 열기',
      segs: [
        { say: '이제 휴대폰에 앱을 설치하겠습니다. 안드로이드 폰에서는 <b>크롬</b>을 엽니다.', do: [['screen', 'phA', { state: 'blank' }], ['blink', 'pAddr', 1500]] },
        { say: '주소창에 내 앱 주소를 입력합니다. PC에서 카카오톡 나와의 채팅으로 주소를 보내 두면 누르기만 하면 되어 편합니다.', do: [['click', 'pAddr'], ['type', 'pAddr', 'hong-stock-journal.vercel.app']] },
        { say: '매매일지가 열렸습니다.', do: [['screen', 'phA', { state: 'app' }], ['check', 'app']] }
      ],
      mission: { text: '휴대폰 브라우저로 내 Vercel 주소(<code>○○.vercel.app</code>)를 열어 보세요. 안드로이드는 <b>크롬</b>, 아이폰은 <b>사파리</b>를 쓰세요.' }
    },
    { id: 'phone-android', ch: C8, title: '안드로이드: 홈 화면에 설치',
      segs: [
        { say: '오른쪽 위의 톱니바퀴 설정 버튼을 누릅니다.', do: [['screen', 'phA', { state: 'app' }], ['click', 'gear'], ['screen', 'phA', { state: 'settings' }]] },
        { say: '<b>앱으로 설치</b> 항목의 <b>홈 화면에 설치</b> 버튼을 누릅니다.', do: [['blink', 'instSec', 1500], ['click', 'inst'], ['screen', 'phA', { state: 'dialog' }]] },
        { say: '설치할지 묻는 창이 뜨면 <b>설치</b>를 누릅니다.', do: [['click', 'instOk']] },
        { say: '홈 화면에 매매일지 아이콘이 생겼습니다! 누르면 주소창 없이 앱처럼 전체 화면으로 열립니다.', do: [['screen', 'phA', { state: 'home' }], ['blink', 'newIcon', 1600], ['check', 'newIcon']] }
      ],
      tip: '설치 버튼이 안 보이면 크롬 오른쪽 위 <b>⋮</b> 메뉴 › <b>홈 화면에 추가</b> 또는 <b>앱 설치</b>를 누르세요.'
    },
    { id: 'phone-ios', ch: C8, title: '아이폰: 홈 화면에 추가',
      segs: [
        { say: '아이폰은 반드시 <b>사파리</b>로 주소를 엽니다.', do: [['screen', 'phI', { state: 'app' }], ['blink', 'pAddr', 1500]] },
        { say: '아래쪽의 <b>공유</b> 버튼을 누릅니다. 네모에서 화살표가 위로 나온 모양입니다.', do: [['click', 'share'], ['screen', 'phI', { state: 'sheet' }]] },
        { say: '메뉴에서 <b>홈 화면에 추가</b>를 누릅니다.', do: [['blink', 'addHome', 1200], ['click', 'addHome'], ['screen', 'phI', { state: 'add' }]] },
        { say: '이름을 확인하고 오른쪽 위 <b>추가</b>를 누릅니다.', do: [['blink', 'addName', 1200], ['click', 'addBtn']] },
        { say: '홈 화면에 아이콘이 생겼습니다. 이제 앱처럼 쓰면 됩니다.', do: [['screen', 'phI', { state: 'home' }], ['check', 'newIcon']] }
      ],
      tip: 'iOS 버전에 따라 공유 버튼이 주소창 옆 <b>⋯</b> 메뉴 안에 있을 수 있어요. “홈 화면에 추가”가 안 보이면 공유 메뉴를 위로 끌어올려 보세요.',
      mission: { text: '내 휴대폰 홈 화면에 매매일지를 설치하고, 아이콘을 눌러 전체 화면으로 열리는지 확인하세요.' }
    },

    /* ===== 마무리 ===== */
    { id: 'trouble-deploy', ch: C9, title: '문제 해결 ① 배포가 안 될 때',
      segs: [
        { say: '자주 만나는 문제를 실제 화면으로 살펴보겠습니다. 첫째, 배포는 Ready인데 주소를 열면 <b>404 NOT_FOUND</b>, 페이지를 찾을 수 없다고 나올 때입니다.', do: [['screen', 'page404'], ['blink', 'nf404', 2600]] },
        { say: 'GitHub 저장소를 열어 보니 stock-journal 폴더 하나만 보입니다. 폴더째 올려서 Vercel이 public 폴더를 못 찾은 경우입니다.', do: [['screen', 'ghRepo', { nested: true }], ['blink', 'r-nested', 2200]] },
        { say: '이럴 땐 Vercel의 <b>Settings › Build and Deployment</b>에서 <b>Root Directory</b> 칸에 그 폴더 이름을 적고 <b>Save</b>를 누른 뒤, Deployments에서 다시 배포하면 됩니다.', do: [['screen', 'vcBuildSettings', {}], ['blink', 'rootCard', 1400], ['click', 'rootInp'], ['type', 'rootInp', 'stock-journal'], ['click', 'rootSave']] },
        { say: '둘째, 배포 상태가 빨간 <b>Error</b>일 때입니다. 실패한 배포를 눌러 Build Logs의 빨간 줄을 읽습니다.', do: [['screen', 'vcDeployDetail', { failed: true }], ['blink', 'dStatus', 1600]] },
        { say: 'No Output Directory named dist found처럼 공개 폴더를 찾을 수 없다고 나오면, 누군가 Output Directory의 Override를 켜고 잘못된 폴더를 적은 것입니다. Build and Deployment에서 Override를 끄고 다시 배포하세요.', do: [['blink', 'errLine', 3600], ['screen', 'vcBuildSettings', {}], ['blink', 'fwCard', 2000]] },
        { say: '셋째, 저장소 고르는 화면에서 내 저장소가 안 보일 때입니다. 처음 연결할 때 그 저장소에 권한을 주지 않은 경우입니다.', do: [['screen', 'vcNew', { state: 'empty' }], ['blink', 'noRepo', 2000]] },
        { say: '아래쪽 <b>Adjust GitHub App Permissions</b>를 눌러 내 저장소를 허용해 주면 목록에 나타납니다.', do: [['blink', 'cfgLink', 1600], ['click', 'cfgLink']] }
      ],
      mission: { text: '문제가 없다면 넘어가도 돼요. 도움이 되는 공식 문서:', links: [['Vercel 문서', 'https://vercel.com/docs'], ['GitHub 문서(한국어)', 'https://docs.github.com/ko']] }
    },
    { id: 'trouble-app', ch: C9, title: '문제 해결 ② 앱을 쓸 때',
      segs: [
        { say: '휴대폰에서 설치 버튼이 안 보일 때가 있습니다. 안드로이드는 크롬 오른쪽 위의 점 세 개 메뉴를 누르고,', do: [['screen', 'phA', { state: 'app' }], ['click', 'pMenu'], ['screen', 'phA', { state: 'menu' }]] },
        { say: '<b>홈 화면에 추가</b> 또는 <b>앱 설치</b>를 누르면 됩니다. 아이폰은 꼭 사파리로 열어야 홈 화면에 추가가 보입니다.', do: [['blink', 'menuAdd', 2200], ['check', 'menuAdd']] },
        { say: '파일을 고쳤는데 앱이 그대로라면, 먼저 Deployments에서 배포가 Ready까지 끝났는지 확인합니다. 아직 Building이면 조금 기다립니다. 그리고 예전 버전으로 되돌린 상태라면 Manage로 자동 공개를 다시 켜야 합니다.', do: [['screen', 'vcDeployments', { auto: true }], ['blink', 'newRow', 2600]] },
        { say: '배포가 끝났는데도 그대로면 앱을 완전히 닫았다가 다시 엽니다. PC에서는 컨트롤과 F5를 함께 눌러 새로고침합니다. 한두 번 다시 열면 새 버전이 나옵니다.', do: [['screen', 'appPC', { url: 'hong-stock-journal.vercel.app' }], ['blink', 'addr', 2200]] },
        { say: '주소를 바꾼 뒤 기록이 사라졌다면 지워진 것이 아닙니다. 기록은 주소별로 따로 저장되기 때문에 예전 주소에 그대로 남아 있습니다.', do: [['screen', 'appPC', { url: 'hong-stock-journal.vercel.app', empty: true }], ['blink', 'emptyMsg', 2400]] },
        { say: '예전 주소에서 설정의 <b>백업 데이터 복사</b>를 누르고, 새 주소의 <b>데이터 복구</b> 칸에 붙여 넣은 뒤 적용을 누르면 옮겨집니다.', do: [['screen', 'appPC', { url: 'stock-journal-a1b2c3.vercel.app', backup: true }], ['blink', 'backupSec', 2000], ['blink', 'restoreSec', 2000]] }
      ],
      tip: '주소를 바꿔도 예전 <code>stock-journal-a1b2c3.vercel.app</code> 주소가 남아 있을 수 있어요. Settings › Domains에서 확인하고, 백업을 옮긴 뒤에는 새 주소만 쓰세요.'
    },
    { id: 'finish', ch: C9, title: '정리',
      segs: [
        { say: '오늘 한 일을 정리해 보겠습니다.', do: [['screen', 'finish']] },
        { say: 'GitHub와 Vercel이 왜 필요한지 이해하고, GitHub 저장소를 만들어 매매일지 파일을 올렸습니다.', do: [['check', 'd1', 300], ['check', 'd2', 300]] },
        { say: 'Vercel을 연결해 배포하고, 메뉴를 둘러보며 주소를 바꿨습니다.', do: [['check', 'd3', 300], ['check', 'd4', 300]] },
        { say: '환경 변수를 넣고, 파일을 고치면 자동으로 배포되는 것도 확인했습니다.', do: [['check', 'd5', 300], ['check', 'd6', 300]] },
        { say: '로그 읽기, 되돌리기, 알림, 도메인, 무료 사용량까지 Vercel을 잘 쓰는 방법도 배웠습니다.', do: [['check', 'd7', 300], ['check', 'd8', 300]] },
        { say: '그리고 휴대폰 홈 화면에 나만의 매매일지 앱을 설치했습니다. 수고하셨습니다!', do: [['check', 'd9', 300]] }
      ],
      mission: { text: '내 앱 주소를 즐겨찾기에 저장하고, 매매일지에 오늘의 첫 기록을 남겨 보세요. 🎉', links: [['내 Vercel 열기', 'https://vercel.com/dashboard']] }
    }
  ];
})();
