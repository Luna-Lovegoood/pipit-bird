const express = require("express");
const app = express();
const mongoClient = require('mongodb').MongoClient;
//const url = "mongodb://127.0.0.1:27017";
const url = "mongodb://pipit-bird:pipit-bird20@182.92.174.94:27017/pipit-bird"; // Luna 2020.1.27 本地连接改为远程连接

//解决跨域问题
app.all('*',function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');//*表示可以跨域任何域名都行（包括直接存在本地的html文件）出于安全考虑最好只设置 你信任的来源也可以填域名表示只接受某个域名
  res.header('Access-Control-Allow-Headers','X-Requested-With,Content-Type');//可以支持的消息首部列表
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');//可以支持的提交方式
  res.header('Content-Type','application/json;charset=utf-8');//响应头中定义的类型
  next();
});

mongoClient.connect(url, function(err, client) {
  if(err){
        console.log('Failure to connect database');
        throw err;
  }
  console.log('Connection successfully to server');

  var db = client.db("pipit-bird"); // Luna 2020.1.27 云数据库名称改为pipit-bird
  var collection = db.collection("allbirds");

  app.get("/species", function(req, res) {
    var minYear, maxYear;
    var cleanData = [];
    if(req.query.value) {
      var cond = {};
      cond.English_name = req.query.value;
      console.log(cond);
      if(req.query.left&&req.query.right) {
        minYear = req.query.left;
        maxYear = req.query.right;
        collection.find(cond).toArray(function(err, docs) {
          if(err) console.log('Failed to read data');
          for (var i = 0; i < docs.length; i++) {
            if(parseInt(docs[i].X)>0&&parseInt(docs[i].X)<200
            &&parseInt(docs[i].Y)>0&&parseInt(docs[i].Y)<200
            &&docs[i].Date.slice(-4)>=minYear&&docs[i].Date.slice(-4)<=maxYear) {
              cleanData.push({
                'x': parseInt(docs[i].Y),
                'y': parseInt(docs[i].X),
                'year': docs[i].Date.slice(-4)
              });
            }
          }
          res.status(200);
          res.send(cleanData);
          res.end();
        });
        console.log(minYear, maxYear);
      } else if (req.query.left) {
        minYear = req.query.left;
        collection.find(cond).toArray(function(err, docs) {
          if(err) console.log('Failed to read data');
          for (var i = 0; i < docs.length; i++) {
            if(parseInt(docs[i].X)>0&&parseInt(docs[i].X)<200
            &&parseInt(docs[i].Y)>0&&parseInt(docs[i].Y)<200
            &&docs[i].Date.slice(-4)==minYear) {
              cleanData.push({
                'x': parseInt(docs[i].Y),
                'y': parseInt(docs[i].X),
                'year': docs[i].Date.slice(-4)
              });
            }
          }
          res.status(200);
          res.send(cleanData);
          res.end();
        });
        console.log(minYear);
      }
      else {
        minYear = 1982;
        maxYear = 2018;
        collection.find(cond).toArray(function(err, docs) {
          if(err) console.log('Failed to read data');
          for (var i = 0; i < docs.length; i++) {
            if(parseInt(docs[i].X)>0&&parseInt(docs[i].X)<200
            &&parseInt(docs[i].Y)>0&&parseInt(docs[i].Y)<200
            &&docs[i].Date.slice(-4)>=minYear&&docs[i].Date.slice(-4)<=maxYear) {
              cleanData.push({
                'x': parseInt(docs[i].Y),
                'y': parseInt(docs[i].X),
                'year': docs[i].Date.slice(-4)
              });
            }
          }
          res.status(200);
          res.send(cleanData);
          res.end();
        });
      }
    }    
  });

  app.get("/month", function(req, res) {
    var monthData = [];
    if (req.query.value) {
      var month_cond = {};
      month_cond.English_name = req.query.value;
      collection.find(month_cond).toArray(function(err, docs) {
        if(err) console.log('Failed to read data');
        for (var m = 0; m < 12; m++) {
          var month = [];
          for (var i = 0; i < docs.length; i++) {
            if (docs[i].Date.split('/')[0] == m+1) {
              month.push({
                'x': parseInt(0.55*docs[i].Y),
                'y': parseInt(0.55*docs[i].X)
              })
            }
          }
          monthData.push(month);
        }
        console.log(monthData);
        res.status(200);
        res.send(monthData);
        res.end();
      });
    }
  });

  app.get("/year", function(req, res) {
    var peak = [], yearData = [];
    if (req.query.value) {
      var year_cond = {};
      year_cond.English_name = req.query.value;
      collection.find(year_cond).toArray(function(err, docs) {
        if(err) console.log('Failed to read data');
        for (var i = 0; i < docs.length; i++) {
          if(docs[i].Date.slice(-4)>1982&&docs[i].Date.slice(-4)<2018) {
            peak.push(docs[i].Date.slice(-4));
          }
        }
        var min = Math.min.apply(Math, peak);
        var max = Math.max.apply(Math, peak);
        console.log(min, max);
      });
    }
  });
});

app.listen(3000, function() {
  console.log("express running on http://localhost:3000");
});