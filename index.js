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
    res.sendStatus(200);
    console.log(req.body);
});
