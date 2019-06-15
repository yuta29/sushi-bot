// -----------------------------------------------------------------------------
// ���W���[���̃C���|�[�g
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging API��SDK���C���|�[�g

// -----------------------------------------------------------------------------
// �p�����[�^�ݒ�
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // ���ϐ�����A�N�Z�X�g�[�N�����Z�b�g���Ă��܂�
    channelSecret: process.env.LINE_CHANNEL_SECRET // ���ϐ�����Channel Secret���Z�b�g���Ă��܂�
};

// -----------------------------------------------------------------------------
// Web�T�[�o�[�ݒ�
server.listen(process.env.PORT || 3000);


// -----------------------------------------------------------------------------
// ���[�^�[�ݒ�
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
// API�R�[���̂��߂̃N���C�A���g�C���X�^���X���쐬
const bot = new line.Client(line_config);

// -----------------------------------------------------------------------------
// ���[�^�[�ݒ�
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    // ��s����LINE���ɃX�e�[�^�X�R�[�h200�Ń��X�|���X����B
    res.sendStatus(200);

    // ���ׂẴC�x���g�����̃v���~�X���i�[����z��B
    let events_processed = [];

    // �C�x���g�I�u�W�F�N�g�����������B
    req.body.events.forEach((event) => {
        // ���̏����̑Ώۂ��C�x���g�^�C�v�����b�Z�[�W�ŁA���A�e�L�X�g�^�C�v�������ꍇ�Ɍ���B
        if (event.type == "message" && event.message.type == "text"){
            // ���[�U�[����̃e�L�X�g���b�Z�[�W���u����ɂ��́v�������ꍇ�̂ݔ����B
            if (event.message.text == "����ɂ���"){
                // replyMessage()�ŕԐM���A���̃v���~�X��events_processed�ɒǉ��B
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "����͂����"
                }));
            }
        }
    });

    // ���ׂẴC�x���g�������I�������牽�̃C�x���g���������ꂽ���o�́B
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});