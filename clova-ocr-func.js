module.exports = function (RED) {
  function ClovaOcr(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", function (msg) {
      const replyToken = msg.replyToken;
      msg.payload = msg.payload.images.map((item) => {
        const result = [];
        const regex = /[\u3131-\uD79D]/giu;
        item.fields.map((child) => {
          console.log(child.inferText);
          if (regex.test(child.inferText)) {
            result.push(child.inferText);
          }
        });

        return result;
      });
      var text = msg.payload.join(",");

      msg.payload = {};
      msg.payload.events = [
        {
          type: "message",
          replyToken: replyToken,
          message: {
            type: "text",
            text: text,
          },
        },
      ];

      //return msg;
      node.send(msg);
    });
  }
  RED.nodes.registerType("clova-ocr-func", ClovaOcr);
};
