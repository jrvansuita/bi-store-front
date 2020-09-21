const Routes = require('../routes/controller/routes.js');
const Enum = require('../param/enum.js')
const InstaPosts = require('../provider/instagram-posts')


module.exports = class SocialRoutes extends Routes {
  attach(){
    this._get('/social-floating-widget', (req, res) => {
      res.renderAndCache('social/social-floating-widget');
    });

    this._get('/facebook-comments-widget', (req, res) => {
      res.render('social/facebook-comments-widget', {fullhref: req.query.fullhref});
    });

    this._get('/links-insta', async (req, res)=>{
      res.render('social/links-insta',{
        promos: JSON.parse(await Enum.on('INSTA-PROMOS').get(true)),
        //posts: await InstaPosts.on("boutiqueinfantil.com.br").get()
      });
    });

    this._get('/insta', async (req, res) => {
      res.render('social/insta', {
        promos: JSON.parse(await Enum.on('INSTA-PROMOS').get(true)),
        posts: await InstaPosts.on("boutiqueinfantil.com.br").get()
      });
    });

  }
}
