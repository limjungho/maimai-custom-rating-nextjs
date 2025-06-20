var URL = "https://www.maimaicustomrating.site";
var LoadingTime = 15000;

var dxstddata = [];
var difficultydata = [];
var fcapdata = [];
var musicnamedata = [];
var musicscoredata = [];

var friendcode = "";
var playername = "";
var originalrating = "";

var sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

var fetchSequentially = async () => {
  //1. URL에서 friend code, player name, original rating 정보 fetch
  try {
    const response = await fetch(
      "https://maimaidx-eng.com/maimai-mobile/friend/userFriendCode/"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const html = await response.text();

    const parser = new DOMParser();
    const document = parser.parseFromString(html, "text/html");

    friendcode = document.querySelector("div.see_through_block").innerText;
    playername = document.querySelector("div.name_block").innerText;
    originalrating = document.querySelector("div.rating_block").innerText;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // 13~15레벨(19~23)까지의 음악 정보 가져오기
  try {
    for (let i = 19; i <= 23; i++) {
      var resp2 = await fetch(
        "https://maimaidx-eng.com/maimai-mobile/record/musicLevel/search/?level=" +
          i.toString()
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((html) => {
          // HTML 문자열을 DOM 객체로 변환
          const parser = new DOMParser();
          const document = parser.parseFromString(html, "text/html");

          // 가져온 문서 내에서 특정 요소 선택

          var allmusicname = document.querySelectorAll("div.music_name_block");
          var musicname = [];
          var musicscore = [];
          var fcap = [];
          var difficulty = [];
          var dxstd = [];
          allmusicname.forEach((element) => {
            let sibling = element.nextElementSibling;
            if (sibling.classList.contains("music_score_block")) {
              musicname.push(element);
              musicscore.push(sibling);
              for (let j = 0; j < 3; j++) {
                sibling = sibling.nextElementSibling;
              }
              fcap.push(sibling);
              let sibling2 = element;
              for (let j = 0; j < 3; j++) {
                sibling2 = sibling2.previousElementSibling;
              }
              dxstd.push(sibling2);
              difficulty.push(sibling2.previousElementSibling);
            }
          });

          //var fcap = document.querySelectorAll("img.h_30.f_r");
          //var difficulty = document.querySelectorAll("img.h_20.f_l");
          var difficultySrc = Array.from(difficulty).map((img) => img.src);
          var fcapSrc = Array.from(fcap).map((img) => img.src);

          //var dxstd = document.querySelectorAll("img.music_kind_icon");
          var dxstdSrc = Array.from(dxstd).map((img) => img.src);

          dxstdSrc.forEach((element) => {
            if (element.includes("music_standard.png")) {
              dxstddata.push("STD");
            } else {
              dxstddata.push("DX");
            }
          });
          difficultySrc.forEach((element) => {
            if (element.includes("diff_remaster.png")) {
              difficultydata.push("ReMAS");
            } else if (element.includes("diff_master.png")) {
              difficultydata.push("MAS");
            } else if (element.includes("diff_expert.png")) {
              difficultydata.push("EXP");
            } else {
              difficultydata.push("NONE");
            }
          });
          fcapSrc.forEach((element) => {
            if (element.includes("music_icon_fcp.png")) {
              fcapdata.push("FC+");
            } else if (element.includes("music_icon_fc.png")) {
              fcapdata.push("FC");
            } else if (element.includes("music_icon_app.png")) {
              fcapdata.push("AP+");
            } else if (element.includes("music_icon_ap.png")) {
              fcapdata.push("AP");
            } else {
              fcapdata.push("-");
            }
          });

          musicname.forEach((element) => {
            musicnamedata.push(element.innerText);
          });
          musicscore.forEach((element) => {
            if (element.innerText != null) {
              musicscoredata.push(element.innerText);
            } else {
              musicscoredata.push("0.0%");
            }
          });
          //console.log(musicnamedata);
        })
        .catch((error) => {
          console.error("Error fetching and processing document:", error);
        });
      console.log("fetch result:", i);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  //3. api fetch
  try {
    fetch(URL + "/api/calrating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        musicnamedata,
        dxstddata,
        difficultydata,
        musicscoredata,
        fcapdata,
        friendcode,
        playername,
        originalrating,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.message))
      .catch((error) => console.error("Error:", error));
  } catch (error) {
    console.error("Error api request :", error);
  }
  console.log("await INSERT query");
  await sleep(LoadingTime);

  alert("갱신이 완료되었습니다.\n확인을 클릭하면 INFO 화면으로 이동합니다.");
  window.open(URL + "/ratingresult?friendcode=" + friendcode, "_blank"); // 새 탭에서 URL 열기
};

fetchSequentially();

/*
fetch(
  "https://maimaidx-eng.com/maimai-mobile/record/musicLevel/search/?level=21"
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  })
  .then((html) => {
    // HTML 문자열을 DOM 객체로 변환
    const parser = new DOMParser();
    const document = parser.parseFromString(html, "text/html");

    // 가져온 문서 내에서 특정 요소 선택
    var musiclevel = document.querySelectorAll("div.music_lv_block");
    var musicname = document.querySelectorAll("div.music_name_block");
    var musicscore = document.querySelectorAll("div.music_score_block");
    var fcap = document.querySelectorAll("img.h_30.f_r");
    var fcapSrc = Array.from(fcap)
      .map((img) => img.src)
      .filter((element, index) => index % 3 === 1);

    var musicleveldata = [];
    musiclevel.forEach((element) => {
      musicleveldata.push(element.innerText);
    });
    var musicnamedata = [];
    musicname.forEach((element) => {
      musicnamedata.push(element.innerText);
    });
    var musicscoredata = [];
    musicscore.forEach((element) => {
      musicscoredata.push(element.innerText);
    });

    console.log(musicnamedata);
    console.log(fcapSrc);
  })
  .catch((error) => {
    console.error("Error fetching and processing document:", error);
  });
*/
