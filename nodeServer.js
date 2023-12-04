const http = require("http");
const client = require("./client");

const host = "localhost";
const port = 8000;

const requestListener = function (req, res) {

  
  const url = req.url.split("/");
  const method = req.method;
  // console.log(url, "=========1=============", method)
  
  if (url[1] == "news")
    switch (method) {
      case "GET":
        if (url.length > 1 && url[1]) {
          client.getNews(
            {
              id: url[2],
            },
            (error, news) => {
              if (error) throw error;
              // res.end(news);
          console.log(news)

            }
          );
        }

        // console.log("-_______________!____________")
        client.getAllNews({}, (error, news) => {
          // console.log("______________2_______________", error, news)
          if (error) throw error;
          // res.end(news);
          console.log(news)
        });
        res.end();

        break;
      case "PUT":
        client.editNews(
          {
            id: url[1],
            body: req.body.body,
            postImage: req.body.postImage,
            title: req.body.title,
          },
          (error, news) => {
            if (error) throw error;
            res.end(news);
          }
        );

        break;
      case "DELETE":
        client.deleteNews(
          {
            id: url[1],
          },
          (error, news) => {
            if (error) throw error;
            res.end({ msg: "Successfully deleted a news item." });
          }
        );

        break;
      case "POST":
        client.addNews(
          {
            body: req.body.body,
            postImage: req.body.postImage,
            title: req.body.title,
          },
          (error, news) => {
            if (error) throw error;
            res.end({ data: news, msg: "Successfully created a news." });
          }
        );
        break;
      default:
        res.end("");
        break;
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});