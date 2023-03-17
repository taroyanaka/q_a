function makeOptionTag(ARY){
return `<option value="" selected></option>` + ARY.map(VAL=>`<option value="${VAL}">${VAL}</option>`).join("")
};
function makeSelectTag(ARY, ANSWER){
return `<select class="blank" data-answer="${ANSWER}" data-wrong="" onchange="checker();">
${makeOptionTag(ARY)}
</select>`;
};
function sample(){
    document.querySelector(".fill_in .question").value = `foo bar baz
and foo2 bar2 baz3
or not
or foo2barQUX42ba😄yes😄z3isfoo2bar2baz3
日本語は自然言語のうちの一つで主に日本国内で使われています`;
    document.querySelector(".fill_in .changer").value = `foo
qux
日本
blabla
yes
😄yes😄
no`;
changer();
tester();
checker();
};
// A function to check if a symbol is contained
function contains_symbol(input) {
    const symbols = '!@#$%^&*()_+-={}[]|;:\'"<>,.?/\\';
    for (let i = 0; i < input.length; i++) {
        if (symbols.indexOf(input[i]) !== -1) {
            return false;
        }
    }
    return true;
};
function changer(){
    // Return early if symbols are included for security purposes.
    if(document.querySelector(".fill_in .changer").value.split("\n").every(V=>contains_symbol(V)) == false){
        return;
    }
    // https://stackoverflow.com/a/1234725
    const regex = "(" + document.querySelector(".fill_in .changer").value.split("\n").map(V=>`${V}|`).join("").slice(0, -1) + ")";
    const RE = new RegExp(regex, "gm");
    document.querySelector(".fill_in .answer").innerHTML =
                document.querySelector(".fill_in .question").value.replaceAll(
                    RE,
                    makeSelectTag(
                        document.querySelector(".fill_in .changer").value.split("\n"),
                        "$1"
                    )
                )
                .replaceAll(
                    "\n",
                    `</br>`);
    narrowDownAnswer();
};
function tester(){
    document.querySelectorAll(".fill_in .blank")[0].value = "foo";
    document.querySelectorAll(".fill_in .blank")[1].value = "qux";
    // document.querySelectorAll(".fill_in .blank")[10].value = "qux";
    // document.querySelectorAll(".fill_in .blank")[14].value = "日本";
};
function retry(){
    document.querySelectorAll(".fill_in .blank").forEach(V=>{
        if(V.dataset.wrong === "wrong"){
            V.value="";
            V.dataset.wrong="";
            V.style.backgroundColor="blueviolet";
        }
    })
};
function checkAll(BLANK_ELEMENT, IDX){
    const onceWrongIsKeepColor = (BLANK_ELEMENT) => BLANK_ELEMENT.style.backgroundColor = BLANK_ELEMENT.style.backgroundColor !== "blueviolet" ? "aquamarine" : "blueviolet";
    const checkWithValueToAnswer = (BLANK_ELEMENT) => BLANK_ELEMENT.value === BLANK_ELEMENT.dataset.answer ? BLANK_ELEMENT.style.backgroundColor = "" : onceWrongIsKeepColor(BLANK_ELEMENT);
    const addWrongAndChangeColor = (ELEMENT) => {
        ELEMENT.dataset.wrong = "wrong";
        ELEMENT.style.backgroundColor = "pink";
    }
    const onceWrongBeWrong = (BLANK_ELEMENT) => {
        if(BLANK_ELEMENT.value !== "" && BLANK_ELEMENT.value !== BLANK_ELEMENT.dataset.answer){ addWrongAndChangeColor(BLANK_ELEMENT) };
        if(BLANK_ELEMENT.dataset.wrong === "wrong"){ BLANK_ELEMENT.style.backgroundColor = "pink" };
    };
    checkWithValueToAnswer(BLANK_ELEMENT);
    onceWrongBeWrong(BLANK_ELEMENT);
};
function checker(){
    document.querySelectorAll(".fill_in .blank").forEach((BLANK_ELEMENT, IDX)=> checkAll(BLANK_ELEMENT, IDX));
};
function random(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};
function seedShuffle(array, seed){
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(random(seed) * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
        ++seed
    }
    return array;
};
function narrowDownAnswer(){
    // let SEED = Number(document.querySelector(`fill_in .seedNum`).value);
    let SEED = 42;
    const seedIncrement = () =>SEED++;
    document.querySelectorAll(".fill_in .blank").forEach(SELECT_HTML_ELEMENT=>{
        const OPTION_HTML_ELEMENT = SELECT_HTML_ELEMENT.children;
        const answerOption = Array.from(OPTION_HTML_ELEMENT)
            .filter(V => V.innerText !== "")
            .filter(V => V.innerText === SELECT_HTML_ELEMENT.dataset.answer);
        const shuffledWithoutBlankOptionWithoutAnswerOption = seedShuffle(
                Array.from(OPTION_HTML_ELEMENT)
                    .filter(V => V.innerText !== "")
                    .filter(V => V.innerText !== SELECT_HTML_ELEMENT.dataset.answer)
                , seedIncrement()
            )
            .slice(0, 2);
        const answerAntNotAnswerOptionArray = answerOption.concat(shuffledWithoutBlankOptionWithoutAnswerOption);
        const shuffledAnswerAntNotAnswerOptionArray = seedShuffle(
            answerAntNotAnswerOptionArray,
            seedIncrement());
        const shuffledAnswerAndNotAnswerOptionHTMLString = shuffledAnswerAntNotAnswerOptionArray
            .map(V => V.outerHTML)
            .join("");
        const blankOptionHTMLTagString = `<option value="" selected></option>`;
        const blankAndShuffledAnswerAndNotAnswerOptionHTMLString = blankOptionHTMLTagString + shuffledAnswerAndNotAnswerOptionHTMLString;
        SELECT_HTML_ELEMENT.innerHTML = blankAndShuffledAnswerAndNotAnswerOptionHTMLString;
    })
};