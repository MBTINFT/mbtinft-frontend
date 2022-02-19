var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

const PAGES = ['startPage', 'trainingPage', 'chattingPage'];

function movePage(targetIdx) {
  var idx;
  for (idx = 0; idx < PAGES.length; idx++) {
    if ( idx == targetIdx ) $('#'+PAGES[idx]).show();
    else $('#'+PAGES[idx]).hide();
  }
}

function setLoadingStatus(isOwner, isLoading) {
    if ( isLoading ) {
        var loading_html = "";
        var name = "";
        if ( isOwner ) {
            loading_html = `
            <section id ="my-message-loading" class="message -right">
                <div class="nes-balloon from-left chat-balloon" style="padding-bottom:3px; padding-top:7px;">
                    <div class="spinner-border" style="width: 2rem; height: 2rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <i><img src="../src/intp.png" style="width:100px; height:100px;"></i>
            </section>
            `
            name = account;
        }
        else {
            loading_html = `
            <section id="message-loading" class="message -left">
                <i><img src="../src/enfp.png" style="width:100px; height:100px;"></i>
                <div class="nes-balloon from-left chat-balloon" style="padding-bottom:3px; padding-top:7px;">
                    <div class="spinner-border" style="width: 2rem; height: 2rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </section>
            `
            name = '칭구';
        }
        $(".message-list").append(loading_html);
        $("#message-status-text").text(name+"님이 작성중입니다...");
    }
    else {
        if ( isOwner ) { $("#my-message-loading").remove(); }
        else { $("#message-loading").remove(); }
        $("#message-status-text").text("");
    }
}

function drawSpinner() {
    if ($("#my-message-loading").length == 0) {
        setLoadingStatus(true, true);
    } else if ($('input#message_field').val() == "") {
        setLoadingStatus(true, false);
    }
}

async function sendRequestAndDrawResponse(msg) {
    let reply_message = await echo(msg);
    console.log(reply_message);
    var message_html = `
    <section class="message -left">
        <i><img src="../src/enfp.png" style="width:100px; height:100px;"></i>
        <div class="nes-balloon from-left chat-balloon">
            <p>` + reply_message + `</p>
        </div>
    </section>
    `;
    setLoadingStatus(false, false);
    $(".message-list").append(message_html);
    window.scrollTo(0,document.body.scrollHeight);
   /*
    sendInferenceReq(msg).done(function(reply_message){
        console.log(reply_message);
        var message_html = `
        <section class="message -left">
            <i><img src="../src/enfp.png" style="width:100px; height:100px;"></i>
            <div class="nes-balloon from-left chat-balloon">
                <p>` + reply_message + `</p>
            </div>
        </section>
        `;
        setLoadingStatus(false, false);
        $(".message-list").append(message_html);
        window.scrollTo(0,document.body.scrollHeight);
    });
    */
}

function sendMessage() {
    var message = $('input#message_field').val();
    var message_html = `
    <section class="message -right">
        <div class="nes-balloon from-right chat-balloon">
            <p>` + message + `</p>
        </div>
        <i><img src="../src/intp.png" style="width:100px; height:100px;"></i>
    </section>
    `;
    $(".message-list").append(message_html);
    $("#my-message-loading").remove();
    $("#message-status-text").text("");
    $('input#message_field').val('');
    window.scrollTo(0,document.body.scrollHeight);
    setLoadingStatus(false, true);
    sendRequestAndDrawResponse(message);
}