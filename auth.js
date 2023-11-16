const firebaseConfig = {
    apiKey: "AIzaSyBcOlIDP2KWbJuKM0WeMHNp-WvjTVfLt9Y",
    authDomain: "p2auth-ea50a.firebaseapp.com",
    projectId: "p2auth-ea50a",
    storageBucket: "p2auth-ea50a.appspot.com",
    messagingSenderId: "796225429484",
    appId: "1:796225429484:web:ece56ef2fc0be28cd6eac9"
};

firebase.initializeApp(firebaseConfig);
const google = new firebase.auth.GoogleAuthProvider();
const github = new firebase.auth.GithubAuthProvider();
const twitter = new firebase.auth.TwitterAuthProvider();
const facebook = new firebase.auth.FacebookAuthProvider();


// firebase.auth().languageCode = 'ja';
// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//         'size': 'invisible',
//         'callback': (response) => {
//             // reCAPTCHA solved, allow signInWithPhoneNumber.
//             onSignInSubmit();
//         }
//     });
// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');


function signOut() {
    firebase.auth().signOut().then(() => {
        console.log(`Sign-out successful`);
    }).catch((error) => {
        console.log(`Sign-out error`);
    });
}
let tmp;
const endpoint = 'http://localhost:8000/p2_login';

function loadText() {
    if (!firebase.auth().currentUser) {
        document.querySelector(".loginrResult").innerText = "you need to login or wait few seconds";
    }
    const option =
        `?uid=${firebase.auth().currentUser.uid}`
        + `&getjson=true`
        ;
}

function replaceUrlToLocalhost(params) {
    window.location.replace("http://localhost:3000" + location.pathname);
}
function checkLogin() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.querySelector(".loginrResult").innerText = "login success";
            document.querySelectorAll(".login").forEach(V=>V.style = "display:none")
            document.querySelector(".logout").style = "display:inline";
        } else {
            document.querySelector(".loginrResult").innerText = "not login yet";
            document.querySelector(".logout").style = "display:none";
            document.querySelectorAll(".login").forEach(V=>V.style = "display:inline")
        }
    })
}

function googleLogin() {
    firebase.auth().signInWithRedirect(google);
    // https://p2auth-ea50a.firebaseapp.com/__/auth/handler
}
function twitterLogin() {
    // https://p2auth-ea50a.firebaseapp.com/__/auth/handler
    // https://qiita.com/sl2/items/2815e62aaf2baea2f589
    firebase.auth().signInWithRedirect(twitter);
}
function facebookLogin() {
    // https://p2auth-ea50a.firebaseapp.com/__/auth/handler
    // https://blog.katsubemakito.net/firebase/firebase-authentication-facebook-web1
    firebase.auth().signInWithRedirect(facebook);
}
function githubLogin() {
    firebase.auth().signInWithRedirect(github);
}

function timer(str) {
    document.querySelector(".loginrResult").innerText = str;
    tmp = setTimeout(timerFunc, 3000);
}
function timerFunc() {
    document.querySelector(".loginrResult").innerText = "";
}
async function updateText2() {
    // if (!firebase.auth().currentUser) {
    //     document.querySelector(".loginrResult").innerText = "not login";
    // }
    url = 'http://localhost:8000/p2_login' + `?uid=${'taroU52ucOfCgtFqwDClwfyanaka'}`;
    res = await fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json',},});
    data = await res.json(); console.log(data);
    return data;
    // timer(data.id);
}

// checkLogin();
// loadText();

// (本実装用の設計):ログインボタンのみでID/PASS管理
// 1.ID/PASS保存用のテーブルを作る
// 2.ログイン時にID/PASSをテーブルに保存する
// 3.ログイン時にID/PASSがテーブルにあればログインする
// 4.ログイン時にID/PASSがテーブルになければ新規登録する

// (試作用の設計):ID/PASS生成画面で管理(google loginのみとする(管理が面倒だし攻撃に対処が容易なので))
// 1.ログイン(サインイン)してIDをテーブルに保存する
// 2.自動でPASSが生成される
// 3.PASSが生成されたらテーブルに保存する
// 4.ユーザーにID/PASSを表示する
// 0_1.再度ID/PASS生成画面でID/PASSを生成すると1_4が実行される(別のPASSが生成される)
// =>(テーブルのPASSは上書きされる)
// (user_permission_idは2('user')としてusersテーブルに保存する)
// (PASSの仕様を決めた方がいい(長さと利用文字種)というかパスワード生成のコードを作る際に一旦決める)
// (usersテーブルは別のDBとして保存するべきかもしれない)
// uidは28文字の小文字大文字英数字
// =>IDはuidの先頭8文字(アルファベットと数字の組み合わせで、8文字で設定は、約218兆通り)
//   =>uidの先頭8文字を小文字にして設定する(2兆8211億990万7456通り)
// =>アルファベット小文字26文字、数字は10文字で6文字は何通り、2176782336通り
//   =>5文字は60466176通り
//   =>4文字は1679616通り
// =>PASSはuidを小文字化してシャッフルして末尾に_サービス名を付ける(_googleや_facebookなど)
// 
