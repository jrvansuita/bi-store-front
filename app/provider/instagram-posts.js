const Request = require('../request/request.js');

module.exports = class InstagramPosts{
    constructor(user) {
        this.url = "https://www.instagram.com/" + user + '/?__a=1'
    }

    static on(user) {
        return new InstagramPosts(user);
    }

    async get() {
        return new Promise((resolve, reject) => {
            new Request(true)
                .url(this.url)
                .success((data) => {
                    data = JSON.parse(data)
                    resolve(this.getInfo(data.graphql.user.edge_owner_to_timeline_media.edges));
                })
                .error((error) => {
                    reject(error);
                })
                .get();
        });
    }

    getInfo(data) {
        var info = [];
        var regex = /\b(https?:\/\/\S*\b)/g;

        data.forEach((each) => {
            var comment = each.node.edge_media_to_caption.edges[0].node.text?.match(regex)?.[0] || "https://www.boutiqueinfantil.com.br"
            var image = each.node.thumbnail_resources[2].src

            info.push({ desc: comment, image: image });
        })
        return info
    }
}