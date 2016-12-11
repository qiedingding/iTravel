"use strict";
/*
 Created by Xuan Li on 2016/12/5

 */
const dbConnection = require("../config/mongoConnection");
const uuid = require("node-uuid");
const bcrypt = require("bcrypt-nodejs");
const data = require("../data/");
const blog = data.blog;
const site = data.site;
const user = data.user;
const city = data.city;
const food = data.food;
const image = data.image;
const comment = data.comment;
const type = data.type;

dbConnection().then(db => {
    return db.collection("type").drop().then(function () {
        return db;
    }, function () {
        return db;
    }).then((db) => {
        return db.createCollection("type");
    }).then(function (typeCollection) {
        let createType = (id, TypeName) => {
            return {
                _id: id,
                typeName: TypeName
            }
        };

        let listOfType = [];
        // typeForUser
        let usertype1 = createType("100001", "normal user");
        let usertype2 = createType("100002", "advanced user");
        let usertype3 = createType("100009", "super user");
        listOfType.push(usertype1, usertype2, usertype3);

        // typeForImage
        let imagetype1 = createType("200001", "user upload image");
        let imagetype2 = createType("200002", "super user upload image");
        let imagetype3 = createType("200009", "main image");
        listOfType.push(imagetype1, imagetype2, imagetype3);

        // typeForBlog
        let blogtype1 = createType("300001", "normal blog");
        let blogtype2 = createType("300002", "food blog");
        let blogtype3 = createType("300003", "view blog");
        let blogtype4 = createType("300004", "site blog");
        let blogtype5 = createType("300005", "advanced blog");
        listOfType.push(blogtype1, blogtype2, blogtype3, blogtype4, blogtype5);

        // typeForFood
        let foodtype1 = createType("400001", "famous food");
        let foodtype2 = createType("400002", "local food");
        let foodtype3 = createType("400003", "Fast food");
        let foodtype4 = createType("400004", "coffee");
        listOfType.push(foodtype1, foodtype2, foodtype3, foodtype4);

        // typeForSite
        let sitetype1 = createType("500001", "old site");
        let sitetype2 = createType("500002", "shopping site");
        let sitetype3 = createType("500003", "famous site");
        let sitetype4 = createType("500004", "nature site");
        listOfType.push(sitetype1, sitetype2, sitetype3, sitetype4);

        return typeCollection.insertMany(listOfType).then(() => {
            console.log("Done seeding for type!");
            return db.collection("user").drop().then(function () {
                return db;
            }, function () {
                return db;
            }).then((db) => {
                return db.createCollection("user");
            }).then(function (userCollection) {

                let createUser = (id,username, pwd, nickName, gender, dob, description,
                                  phone, email, image, registerTime, lastLoginTime, type, tag) => {
                    return {
                        _id:id,
                        "username": username,
                        "pwd": pwd,
                        "nickName": nickName,
                        "gender": gender,
                        "dob": dob,
                        "description": description,
                        "phone": phone,
                        "email": email,
                        "image": image,
                        "registerTime": registerTime,
                        "lastLoginTime": lastLoginTime,
                        "type": type,
                        "tag": tag
                    }
                };

                let listOfUsers = [];

                // username admin_lx
                let admin_lxTag = ["team member", "admin"];
                let admin_lxPwd = bcrypt.hashSync("lixuan123");
                let admin_lx = createUser("5622121", "admin_lx", admin_lxPwd, "PenguingXuan", "male", "1993/09/21",
                    "admin", "5512477786", "xli100@stevens.edu", "admin-default", "2016/12/01", "2016/12/01", "100009", admin_lxTag);
                // username admin_lyr
                let admin_lyrTag = ["team member", "admin"];
                let admin_lyrPwd = bcrypt.hashSync("liyiran123");
                let admin_lyr = createUser("5622122", "admin_lyr", admin_lyrPwd, "Ianluckier", "male", "1992/03/23",
                    "admin", "2016681367", "yli152@stevens.edu", "admin-default", "2016/12/01", "2016/12/01", "100009", admin_lyrTag);
                // username admin_gxy
                let admin_gxyTag = ["team member", "admin"];
                let admin_gxyPwd = bcrypt.hashSync("gexinyu123");
                let admin_gxy = createUser("5622123", "admin_gxy", admin_gxyPwd, "Gebingbing", "female", "2000/04/20",
                    "admin", "5512013601", "xge3@stevens.edu", "admin-default", "2016/12/01", "2016/12/01", "100009", admin_gxyTag);
                // username admin_lqz
                let admin_lqzTag = ["team member", "admin"];
                let admin_lqzPwd = bcrypt.hashSync("liuqingzheng123");
                let admin_lqz = createUser("5622124", "admin_lqz", admin_lqzPwd, "Liuqingzheng", "male", "1993/01/01",
                    "admin", "5512548873", "qzliu@stevens.edu", "admin-default", "2016/12/01", "2016/12/01", "100009", admin_lqzTag);
                // username admin_zzh
                let admin_zzhTag = ["team member", "admin"];
                let admin_zzhPwd = bcrypt.hashSync("zhaozihao123");
                let admin_zzh = createUser("5622125", "admin_zzh", admin_zzhPwd, "Zhaozihao", "male", "1993/01/01",
                    "admin", "5512477786", "zhzhao@stevens.edu", "admin-default", "2016/12/01", "2016/12/01", "100009", admin_zzhTag);

                // username testUser
                let testTag = ["test user", "test"];
                let testPwd = bcrypt.hashSync("test12345");
                let test1 = createUser("5622126","test1", testPwd, "test1", "male", "1992/01/11",
                    "admin", "5512477786", "test@stevens.edu", "admin-default", "2016/12/1", "2016/12/1", "100001", testTag);

                let test2 = createUser("5622127","test2", testPwd, "test2", "male", "1992/01/11",
                    "admin", "5512477786", "test@stevens.edu", "admin-default", "2016/12/1", "2016/12/1", "100001", testTag);

                let test3 = createUser("5622128","test3", testPwd, "test3", "male", "1992/01/11",
                    "admin", "5512477786", "test@stevens.edu", "admin-default", "2016/12/1", "2016/12/1", "100001", testTag);

                let test4 = createUser("5622129","test4", testPwd, "test4", "male", "1992/01/11",
                    "admin", "5512477786", "test@stevens.edu", "admin-default", "2016/12/1", "2016/12/1", "100001", testTag);


                // add user into array
                listOfUsers.push(admin_lx, admin_lyr, admin_gxy, admin_lqz, admin_zzh);
                listOfUsers.push(test1, test2, test3, test4);

                return userCollection.insertMany(listOfUsers).then(() => {
                    console.log("Done seeding for user!");
                    return db.collection("image").drop().then(function () {
                        return db;
                    }, function () {
                        return db;
                    }).then((db) => {
                        return db.createCollection("image");
                    }).then(function (imageCollection) {
                        let createImage = (id, name, address, createTime, path,type, userId, blogId, siteId, cityId, foodId) => {
                            return {
                                _id: id,
                                name: name,
                                address: address,
                                createTime: createTime,
                                path:path,
                                type: type,
                                userId: userId,
                                blogId: blogId,
                                siteId: siteId,
                                cityId: cityId,
                                foodId: foodId
                            }
                        };

                        let listOfImages = [];

                        // images_Beijing

                        let BeijingMainImage = createImage("900001", "Beijing", "Beijing", "2016/12/01", "/public/images/BeijingMainImage.png", "200009", "usr1", "blog1", "site1", "60020", "food1");
                        let BeijingImage_1 = createImage("900002", "Beijing", "Beijing", "2016/12/01", "/public/images/Beijing_1.jpeg", "200002", "usr1", "blog1", "site1", "60020", "food1");
                        let BeijingImage_2 = createImage("900003", "Beijing", "Beijing", "2016/12/01", "/public/images/Beijing_2.jpeg", "200002", "usr1", "blog1", "site1", "60020", "food1");
                        let BeijingImage_3 = createImage("900004", "Beijing", "Beijing", "2016/12/01", "/public/images/Beijing_3.jpeg", "200002", "usr1", "blog1", "site1", "60020", "food1");
                        let BeijingImage_4 = createImage("900005", "Beijing", "Beijing", "2016/12/01", "/public/images/Beijing_4.jpeg", "200002", "usr1", "blog1", "site1", "60020", "food1");
                        let BeijingImage_5 = createImage("900006", "Beijing", "Beijing", "2016/12/01", "/public/images/Beijing_5.jpeg", "200002", "usr1", "blog1", "site1", "60020", "food1");
                        let BeijingImage_6 = createImage("900007", "Beijing", "Beijing", "2016/12/01", "/public/images/Beijing_6.jpeg", "200002", "usr1", "blog1", "site1", "60020", "food1");
                        let BeijingImage_7 = createImage("900008", "Beijing", "Beijing", "2016/12/01", "/public/images/Beijing_7.jpeg", "200002", "usr1", "blog1", "site1", "60020", "food1");
                        let BeijingImage_8 = createImage("900009", "Beijing", "Beijing", "2016/12/01", "/public/images/Beijing_8.jpeg", "200002", "usr1", "blog1", "site1", "60020", "food1");
                        // images_Shanghai
                        let ShanghaiMainImage = createImage("9000010", "Shanghai", "Shanghai", "2016/12/02", "/public/images/Shanghai.jpg", "200009", "usr2", "blog2", "site2", "60021", "food2");
                        let ShanghaiImage_1 = createImage("9000011", "Shanghai", "Shanghai", "2016/12/02", "/public/images/Shanghai_1.jpeg", "200002", "usr2", "blog2", "site2", "60021", "food2");
                        let ShanghaiImage_2 = createImage("9000012", "Shanghai", "Shanghai", "2016/12/02", "/public/images/Shanghai_2.jpeg", "200002", "usr2", "blog2", "site2", "60021", "food2");
                        let ShanghaiImage_3 = createImage("9000013", "Shanghai", "Shanghai", "2016/12/02", "/public/images/Shanghai_3.jpeg", "200002", "usr2", "blog2", "site2", "60021", "food2");
                        let ShanghaiImage_4 = createImage("9000014", "Shanghai", "Shanghai", "2016/12/02", "/public/images/Shanghai_4.jpeg", "200002", "usr2", "blog2", "site2", "60021", "food2");
                        let ShanghaiImage_5 = createImage("9000015", "Shanghai", "Shanghai", "2016/12/02", "/public/images/Shanghai_5.jpeg", "200002", "usr2", "blog2", "site2", "60021", "food2");
                        let ShanghaiImage_6 = createImage("9000016", "Shanghai", "Shanghai", "2016/12/02", "/public/images/Shanghai_6.jpeg", "200002", "usr2", "blog2", "site2", "60021", "food2");
                        let ShanghaiImage_7 = createImage("9000017", "Shanghai", "Shanghai", "2016/12/02", "/public/images/Shanghai_7.jpeg", "200002", "usr2", "blog2", "site2", "60021", "food2");
                        let ShanghaiImage_8 = createImage("9000018", "Shanghai", "Shanghai", "2016/12/02", "/public/images/Shanghai_8.jpeg", "200002", "usr2", "blog2", "site2", "60021", "food2");
                        // images_Shenzhen
                        let XianMainImage = createImage("9000019", "Xian", "Xian", "2016/12/03", "/public/images/Xian.jpeg", "200009", "usr3", "blog3", "site3", "60022", "food3");
                        let XianImage_1 = createImage("9000020", "Xian", "Xian", "2016/12/03", "/public/images/Xian_1.jpeg", "200002", "usr3", "blog3", "site3", "60022", "food3");
                        let XianImage_2 = createImage("9000021", "Xian", "Xian", "2016/12/03", "/public/images/Xian_2.jpeg", "200002", "usr3", "blog3", "site3", "60022", "food3");
                        let XianImage_3 = createImage("9000022", "Xian", "Xian", "2016/12/03", "/public/images/Xian_3.jpeg", "200002", "usr3", "blog3", "site3", "60022", "food3");
                        let XianImage_4 = createImage("9000023", "Xian", "Xian", "2016/12/03", "/public/images/Xian_4.jpeg", "200002", "usr3", "blog3", "site3", "60022", "food3");
                        let XianImage_5 = createImage("9000024", "Xian", "Xian", "2016/12/03", "/public/images/Xian_5.jpeg", "200002", "usr3", "blog3", "site3", "60022", "food3");
                        let XianImage_6 = createImage("9000025", "Xian", "Xian", "2016/12/03", "/public/images/Xian_6.jpeg", "200002", "usr3", "blog3", "site3", "60022", "food3");
                        let XianImage_7 = createImage("9000026", "Xian", "Xian", "2016/12/03", "/public/images/Xian_7.jpeg", "200002", "usr3", "blog3", "site3", "60022", "food3");
                        let XianImage_8 = createImage("9000027", "Xian", "Xian", "2016/12/03", "/public/images/Xian_8.jpeg", "200002", "usr3", "blog3", "site3", "60022", "food3");
                        //images_BeijingSites
                        let BadalingChangchengImage = createImage("9000028", "Great Wall", "Beijing", "2016/12/04", "/public/images/Beijing_Site1_Changcheng.jpeg", "200002", "usr4", "blog4", "7771", "60020", "food4");
                        let GugongImage = createImage("9000029", "Forbidden City", "Beijing", "2016/12/04", "/public/images/Beijing_Site2_Gugong.jpeg", "200002", "usr4", "blog4", "7772", "60020", "food4");
                        let NiaoChaoImage = createImage("9000030", "National Stadium", "Beijing", "2016/12/04", "/public/images/Beijing_Site3_Niaochao.jpg", "200002", "usr4", "blog4", "7773", "60020", "food4");
                        //images_BeijingFood
                        let KaoyaImage = createImage("9000031", "Kaoya", "Beijing", "2016/12/05", "/public/images/Beijing_Food1_Kaoya.jpeg", "200002", "usr5", "blog5", "site5", "60020", "8881");
                        let ZhajiangmianImage = createImage("9000032", "Zhajiangmian", "Beijing", "2016/12/05", "/public/images/Beijing_Food2_Zhajiangmian.jpeg", "200002", "usr5", "blog5", "site5", "60020", "8882");
                        let BaoduImage = createImage("9000033", "Baodu", "Beijing", "2016/12/05", "/public/images/Beijing_Food3_Baodu.jpeg", "200002", "usr5", "blog5", "site5", "60020", "8883");
                        //images_ShanghaiSites
                        let DongFangMingZhuImage = createImage("9000034", "DongFangMingZhu", "Shanghai", "2016/12/06", "/public/images/Shanghai_Site1_Dongfangmingzhu.jpeg", "200002", "usr6", "blog6", "7774", "60021", "food6");
                        let WaiTanImage = createImage("9000035", "WaiTan", "Shanghai", "2016/12/06", "/public/images/Shanghai_Site2_Waitan.jpg", "200002", "usr6", "blog6", "7775", "60021", "food6");
                        let ChengHuangMiaoImage = createImage("9000036", "ChengHuangMiao", "Shanghai", "2016/12/06", "/public/images/Shanghai_Site3_Chenghuangmiao.jpeg", "200002", "usr6", "blog6", "7776", "60021", "food6");
                        //images_ShanghaiFood
                        let ShengjianImage = createImage("9000037", "Shengjian", "Shanghai", "2016/12/07", "/public/images/Shanghai_Food1_Shengjian.jpeg", "200002", "usr7", "blog7", "site7", "60021", "8884");
                        let XiaolongbaoImage = createImage("9000038", "Xiaolongbao", "shanghai", "2016/12/07", "/public/images/Shanghai_Food2_Xiaolongbao.jpeg", "200002", "usr7", "blog7", "site7", "60021", "8885");
                        let HuntunImage = createImage("9000039", "Huntun", "Shanghai", "2016/12/07", "/public/images/Shanghai_Food3_Huntun.jpg", "200002", "usr7", "blog7", "site7", "60021", "8886");
                        //images_XianSites
                        let BingmayongImage = createImage("9000040", "Bingmayong", "Xian", "2016/12/08", "/public/images/Xian_Site1_Bingmayong.jpeg", "200002", "usr8", "blog8", "7777", "60022", "food8");
                        let DayantaImage = createImage("9000041", "Dayanta", "Xian", "2016/12/08", "/public/images/Xian_Site2_Dayanta.jpeg", "200002", "usr8", "blog8", "7778", "60022", "food8");
                        let HuaqingchiImage = createImage("9000042", "Huaqingchi", "Xian", "2016/12/08", "/public/images/Xian_Site3_Huaqingchi.jpeg", "200002", "usr8", "blog8", "7779", "60022", "food8");
                        //images_XianFood
                        let YangroupaomoImage = createImage("9000043", "Yangroupaomo", "Xian", "2016/12/09", "/public/images/Xian_Food1_Yangroupaomo.jpeg", "200002", "usr9", "blog9", "site9", "60022", "8887");
                        let RoujiamoImage = createImage("9000044", "Roujiamo", "Xian", "2016/12/09", "/public/images/Xian_Food2_Roujiamo.jpeg", "200002", "usr9", "blog9", "site9", "60022", "8888");
                        let LiangpiImage = createImage("9000045", "Liangpi", "Xian", "2016/12/09", "/public/images/Xian_Food3_Liangpi.jpeg", "200002", "usr9", "blog9", "site9", "60022", "8889");
                        //images_Blogs
                        let blogImage1 = createImage("9000046", "blog1", "Beijing", "2016/12/10", "/public/images/g1.jpg", "200009", "usr10", "50331", "site10", "60020", "food10");
                        let blogImage2 = createImage("9000047", "blog2", "Shanghai", "2016/12/10", "/public/images/g2.jpg", "200009", "usr10", "50332", "site10", "60021", "food10");                       
                        let blogImage3 = createImage("9000048", "blog3", "Xian", "2016/12/10", "/public/images/g3.jpg", "200009", "usr10", "50333", "site10", "60022", "food10");

                        listOfImages.push(BeijingMainImage, BeijingImage_1, BeijingImage_2, BeijingImage_3, BeijingImage_4, BeijingImage_5, BeijingImage_6, BeijingImage_7, BeijingImage_8, ShanghaiMainImage, ShanghaiImage_1, ShanghaiImage_2, ShanghaiImage_3, ShanghaiImage_4, ShanghaiImage_5, ShanghaiImage_6, ShanghaiImage_7, ShanghaiImage_8, XianMainImage, XianImage_1, XianImage_2, XianImage_3, XianImage_4, XianImage_5, XianImage_6, XianImage_7, XianImage_8, BadalingChangchengImage, GugongImage, NiaoChaoImage, KaoyaImage, ZhajiangmianImage, BaoduImage, DongFangMingZhuImage, WaiTanImage, ChengHuangMiaoImage, ShengjianImage, XiaolongbaoImage, HuntunImage, BingmayongImage, DayantaImage, HuaqingchiImage, YangroupaomoImage, RoujiamoImage, LiangpiImage, blogImage1, blogImage2, blogImage3);

                        return imageCollection.insertMany(listOfImages).then(() => {
                            console.log("Done seeding for image!");
                            return db.collection("city").drop().then(function () {
                                return db;
                            }, function () {
                                return db;
                            }).then((db) => {
                                return db.createCollection("city");
                            }).then(function (cityCollection) {
                                let createCity = (id, name, province, description, traffic, weather, history, culture, currency, mainImage, tag) => {
                                    return {
                                        _id: id,
                                        name: name,
                                        province: province,
                                        description: description,
                                        traffic: traffic,
                                        weather: weather,
                                        history: history,
                                        culture: culture,
                                        currency: currency,
                                        mainImage: mainImage,
                                        tag: tag
                                    }
                                };

                                let listOfCities = [];

                                // city_1 Beijing
                                let BeijingTag = ["Capital", "Historic", "Famous", "Tourist", "The Great Wall"];
                                let BeijingCity = createCity("60020", "Beijing", "Beijing", "Beijing (formerly romanised as Peking) is the capital of the People's Republic of China and the world's third most populous city proper. It is also one of the world's most populous capital cities. The city, located in northern China, is governed as a direct-controlled municipality under the national government with 16 urban, suburban, and rural districts. Beijing Municipality is surrounded by Hebei Province with the exception of neighbouring Tianjin Municipality to the southeast; together the three divisions form the Jingjinji metropolitan region and the national capital region of China.", "Beijing, as the capital and a municipality of the People's Republic of China (PRC), is a transport hub, with a sophisticated network of roads, railways and a major airport. Five completed ring roads encircle a city with nine expressways heading in virtually all compass directions, supplemented by eleven China National Highways.", "The monthly daily average temperature in January is −3.7 °C (25.3 °F), while in July it is 26.2 °C (79.2 °F). Precipitation averages around 570 mm (22 in) annually, with close to three-fourths of that total falling from June to August.", "The earliest traces of human habitation in the Beijing municipality were found in the caves of Dragon Bone Hill near the village of Zhoukoudian in Fangshan District, where Peking Man lived. Homo erectus fossils from the caves date to 230,000 to 250,000 years ago. Paleolithic Homo sapiens also lived there more recently, about 27,000 years ago. Archaeologists have found neolithic settlements throughout the municipality, including in Wangfujing, located in downtown Beijing.", "People native to urban Beijing speak the Beijing dialect, which belongs to the Mandarin subdivision of spoken Chinese. This speech is the basis for putonghua, the standard spoken language used in mainland China and Taiwan, and one of the four official languages of Singapore. Rural areas of Beijing Municipality have their own dialects akin to those of Hebei province, which surrounds Beijing Municipality.", "RMB", "900001", BeijingTag);
                                // city_2 Shanghai
                                let ShanghaiTag = ["Modern", "Famous", "Economic", "The Oriental Pearl Tower"];
                                let ShanghaiCity = createCity("60021", "Shanghai", "Shanghai", "Shanghai, often abbreviated as Hu or Shen, is the most populous city proper in the world. It is one of the four direct-controlled municipalities of the People's Republic of China, with a population of more than 24 million as of 2014. It is a global financial centre and transport hub, with the world's busiest container port. Located in the Yangtze River Delta in East China, Shanghai sits on the south edge of the mouth of the Yangtze in the middle portion of the Chinese coast. The municipality borders the provinces of Jiangsu and Zhejiang to the north, south and west, and is bounded to the east by the East China Sea.", "In the city center, there are several elevated expressways to lessen traffic pressure on surface streets, but traffic in and around Shanghai is often heavy and traffic jams are commonplace during rush hour. There are bicycle lanes separate from car traffic on many surface streets, but bicycles and motorcycles are banned from most main roads including the elevated expressways.", "Shanghai has a humid subtropical climate and experiences four distinct seasons. Winters are chilly and damp, with northwesterly winds from Siberia can cause nighttime temperatures to drop below freezing, although most years there are only one or two days of snowfall. Summers are hot and humid, with an average of 8.7 days exceeding 35 °C - 95 °F annually; occasional downpours or freak thunderstorms can be expected.", "During the Spring and Autumn period, the Shanghai area belonged to the Kingdom of Wu, which was conquered by the Kingdom of Yue, which in turn was conquered by the Kingdom of Chu. During the Warring States period, Shanghai was part of the fief of Lord Chunshen of Chu, one of the Four Lords of the Warring States. He ordered the excavation of the Huangpu River. Its former or poetic name, the Chunshen River, gave Shanghai its nickname of Shen. Fishermen living in the Shanghai area created a fishing tool called the hu, which lent its name to the outlet of Suzhou Creek north of the Old City and became a common nickname and abbreviation for the city.", "Shanghai is sometimes considered a center of innovation and progress in China. It was in Shanghai, for example, that the first motor car was driven and (technically) the first train tracks and modern sewers were laid. It was also the intellectual battleground between socialist writers who concentrated on critical realism, which was pioneered by Lu Xun, Mao Dun, Nien Cheng and the famous French novel by André Malraux, Man's Fate, and the more bourgeois, more romantic and aesthetically inclined writers, such as Shi Zhecun, Shao Xunmei, Ye Lingfeng, and Eileen Chang.In the past years Shanghai has been widely recognized as a new influence and inspiration for cyberpunk culture. Futuristic buildings such as the Oriental Pearl Tower and the neon-illuminated Yan'an Elevated Road are a few examples that have helped to boost Shanghai's cyberpunk image.", "RMB", "9000010", ShanghaiTag);
                                // city_3 Xian
                                let XianTag = ["Changan", "Historic", "Ancient Capitals", "Famous"];
                                let XianCity = createCity("60022", "Xian", "Xian", "Xian, formerly romanized as Sian, and also known as Changan before the Ming dynasty, is the capital of Shaanxi Province, People's Republic of China. It is a sub-provincial city located in the center of the Guanzhong Plain in Northwest China. One of the oldest cities in China, Xian is the oldest of the Four Great Ancient Capitals, having held the position under several of the most important dynasties in Chinese history, including Western Zhou, Qin, Western Han, Sui, and Tang. Xian is the starting point of the Silk Road and home to the Terracotta Army of Emperor Qin Shi Huang. Since the 1990s, as part of the economic revival of inland China especially for the central and northwest regions, the city of Xian has re-emerged as an important cultural, industrial and educational centre of the central-northwest region, with facilities for research and development, national security and China's space exploration program. Xian currently holds sub-provincial status, administering 9 districts and 4 counties. As of 2015 Xian has a population of 8,705,600 and the Xian-Xianyang metropolitan area has a population of 13,569,700. It is the most populous city in Northwest China, as well as one of the three most populous cities in Western China. According to a July 2012 report by the Economist Intelligence Unit, it was recently named as one of the 13 emerging megacities, or megalopolises, in China. The report pinpoints and highlights the demographic and income trends that are shaping these cities' development.", "Xian has many areas that are easily accessible on foot. In many commercial, residential, educations zones in the city, especially in the shopping and entertainment districts around the Bell Tower, underpasses and overpasses have been built for the safety and convenience of pedestrians. However, although rare, sidewalks will not support pedestrians due to sinkholes.", "The monthly 24-hour average temperature ranges from around the freezing mark in January to 27.0 °C (80.6 °F) in July, with an annual mean of 14.08 °C (57.3 °F). With monthly percent possible sunshine ranging from 31 percent in December to 47 percent in August, the city receives 1,536 hours of bright sunshine annually.", "Xian has rich and culturally significant history. The Lantian Man was discovered in 1963 in Lantian County, 50 km (31 mi) southeast of Xian, and dates back to at least 500,000 years before the present time. A 6,500-year-old Banpo Neolithic village was discovered in 1953 on the eastern outskirts of the city proper, which contains the remains of several well organized Neolithic settlements carbon dated to 5600–6700 years ago. The site is now home to the Xian Banpo Museum, built in 1957 to preserve the archaeological collection.", "The culture of Xian descends from one of the world's earliest civilizations. The Guanzhong Ren culture is considered the cultural antecedent of Xianese; their features are satirized as the Ten Strangenesses of Guanzhong Ren. Xian is also known for the Eight Great Sights of Changan, a collection of scenic areas in the region.", "RMB", "9000019", XianTag);

                                listOfCities.push(BeijingCity, ShanghaiCity, XianCity);
                                return cityCollection.insertMany(listOfCities).then(() => {
                                    console.log("Done seeding for city!");
                                    return db.collection("site").drop().then(function () {
                                        return db;
                                    }, function () {
                                        return db;
                                    }).then((db) => {
                                        return db.createCollection("site");
                                    }).then(function (siteCollection) {
                                        let createSite = (id, name, locationlat, locationlnt, address, commute, price, closingTime, phone, website, description, mainImage, type, tips, tag, cityId) => {
                                            return {
                                                _id: id,
                                                name: name,
                                                locationlat: locationlat,
                                                locationlnt: locationlnt,
                                                address: address,
                                                commute: commute,
                                                price: price,
                                                closingTime: closingTime,
                                                phone: phone,
                                                website: website,
                                                description: description,
                                                mainImage: mainImage,
                                                type: type,
                                                tips: tips,
                                                tag: tag,
                                                cityId: cityId
                                            }
                                        };

                                        let listOfSites = [];
                                        //BeijingSites
                                        let BeijingSite_1 = createSite("7771", "Badaling Great Wall", 40, 115, "North Entrance, Guangou Old Road, Yanqing County, Beijing", "Bus No.919", "¥40", "7:00PM(Apr-Oct)/6:00PM(Nov-Mar)", "(+86)010-69121383", "http://www.badaling.cn", "Badaling is the site of the most visited section of the Great Wall of China, approximately 80 kilometres (50 mi) northwest of urban Beijing city in Yanqing County, which is within the Beijing municipality. The portion of the wall running through the site was built in 1504 during the Ming Dynasty, along with a military outpost reflecting the location's strategic importance. The highest point of Badaling is Beibalou, approximately 1,015 metres (3,330 ft) above sea level. Badaling Great Wall was built in the Ming Dynasty (1505) to occupy a commanding and strategic position for protecting the Juyongguan Pass (Juyongguan section of the Great Wall ) on its south, further protecting the city of Beijing.", "9000028", "500001", ["Crowded", "Visit in Nov-Mar", "Take the Cable Car"], ["Famous", "Tourist"], "60020");
                                        let BeijingSite_2 = createSite("7772", "The Palace Museum", 39, 116, "The right center of Beijing", "Bus / Subway", "¥40(Nov-Mar)/¥60(Apr-Oct)", "4:00PM", "(+86)010-85007421", "http://www.dpm.org.cn", "The Forbidden City was the Chinese imperial palace from the Ming dynasty to the end of the Qing dynasty—the years 1420 to 1912. It is located in the centre of Beijing, China, and now houses the Palace Museum. It served as the home of emperors and their households as well as the ceremonial and political centre of Chinese government for almost 500 years. Constructed from 1406 to 1420, the complex consists of 980 buildings and covers 72 ha (over 180 acres). The palace complex exemplifies traditional Chinese palatial architecture, and has influenced cultural and architectural developments in East Asia and elsewhere. The Forbidden City was declared a World Heritage Site in 1987, and is listed by UNESCO as the largest collection of preserved ancient wooden structures in the world.", "9000029", "500002", ["Close 12:00PM on Monday", "At least half a day to visit", "Not coming in holidays"], ["ForbiddenCity", "Emperors", "QingDynasty"], "60020");
                                        let BeijingSite_3 = createSite("7773", "Beijing National Stadium", 40, 116, "Olympics Park, Beisihuanzhong Road, Chaoyang District, Beijing", "Bus No.82/207/538 to Beijing East Road", "¥50", "7:00PM(Apr-Oct)/5:30PM(Nov-Mar)", "(+86)010-84373008", "http://www.n-s.cn", "Beijing National Stadium, officially the National Stadium, also known as the Bird's Nest, is a stadium in Beijing, The stadium (BNS) was a joint venture among architects Jacques Herzog and Pierre de Meuron of Herzog & de Meuron, project architect Stefan Marbach, artist Ai Weiwei, and CADG which was led by chief architect Li Xinggang. The stadium was designed for use throughout the 2008 Summer Olympics and Paralympics and will be used again in the 2022 Winter Olympics and Paralympics. The stadium is currently mostly unused, after having been unsuccessfully suggested as the permanent headquarters of the Beijing soccer team.", "9000030", "500003", ["2 hours to visit", "¥80 for tickets including Water Cube and National Stadium", "Night Neonlight Show"], ["2008 Summer Olympics", "Bird Nest", "Famous"], "60020");
                                        //ShanghaiSites
                                        let ShanghaiSite_1 = createSite("7774", "Oriental Pearl Tower", 28, 102, "Lujiazui, Pudong New District, Shanghai", "Subway No.2 / Buses", "¥120/¥150/¥180", "9:30PM", "(+86)021-58798888", "http://orientalpearltower.com/", "The Oriental Pearl Radio & TV Tower is a TV tower in Shanghai. Its location at the tip of Lujiazui in the Pudong district by the side of Huangpu River, opposite The Bund, makes it a distinct landmark in the area. Its principal designers were Jiang Huan Chen, Lin Benlin, and Zhang Xiulin. Construction began in 1991, and the tower was completed in 1994. At 468 m (1,535 feet) high, it was the tallest structure in China from 1994–2007, when it was surpassed by the Shanghai World Financial Center. It is classified as an AAAAA scenic area by the China National Tourism Administration. The tower is brightly lit in different LED sequences at night. On 7 July 2007, Oriental Pearl Tower was host to the Chinese Live Earth concert.", "9000034", "500003", ["2 hours to visit", "Night Scene", "Eat in the Chenghumiao"], ["TV tower", "Huangpu River", "Shanghai World Financial Center"], "60021");
                                        let ShanghaiSite_2 = createSite("7775", "The Bund", 31, 121, "Zhongshan Dongyi Road, Huangpu District, Shanghai", "Subway / Bus", "Free / ¥50 for tunnel", "All day", "No Number", "https://en.wikipedia.org/wiki/The_Bund", "The Bund or Waitan is a waterfront area in central Shanghai. The area centers on a section of Zhongshan Road (East-1 Zhongshan Road) within the former Shanghai International Settlement, which runs along the western bank of the Huangpu River in the eastern part of Huangpu District. The area along the river faces the modern skyscrapers of Pudong District. The Bund usually refers to the buildings and wharves on this section of the road, as well as some adjacent areas. It is one of the most famous tourist destinations in Shanghai. Building heights are restricted in the area.", "9000035", "500003", ["night scene", "sightseeing Ferry", "sightseeing Tunnel"], ["Shanghai International Settlement", "Huangpu River", "Outer Bank"], "60021");
                                        let ShanghaiSite_3 = createSite("7776", "City God Temple of Shanghai", 31, 121, "No.249 Fangbin Central Road, Shanghai", "Buses", "Free", "10:00PM", "(+86)021-63842346", "https://en.wikipedia.org/wiki/City_God_Temple_of_Shanghai", "The City God Temple or Temple of the City Gods, officially the City Temple of Shanghai, is a folk temple located in the old city of Shanghai, China. It commemorates the elevation of Shanghai to municipal status and is the site of the veneration of three Chinese figures honored as the city gods of the town. It is also known by some locals as the Old City God Temple, in reference to a later New City God Temple which no longer exists. In Chinese, Chenghuangmiao is also used as the name of the commercial district near the temple. This is generally known in English as Yu Garden, after a nearby Chinese garden. The district is now incorporated under the name Yuyuan Tourist Mart.", "9000036", "500003", ["2-3 hours to visit", "Food Street", "Famous Shengjian"], ["800 years history", "Temple to pray", "Famous local food"], "60021");
                                        //XianSites
                                        let XianSite_1 = createSite("7777", "Terracotta Army", 34, 109, "Lintong County, Lintong District, Xian", "Bus No.5 / 306", "¥120-150", "6:00PM", "(+86)029-81399001", "http://www.bmy.com.cn", "The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. It is a form of funerary art buried with the emperor in 210–209 BCE and whose purpose was to protect the emperor in his afterlife. The figures, dating from approximately the late third century BCE, were discovered in 1974 by local farmers in Lintong District, Xian, Shaanxi province. The figures vary in height according to their roles, with the tallest being the generals. The figures include warriors, chariots and horses. Estimates from 2007 were that the three pits containing the Terracotta Army held more than 8,000 soldiers, 130 chariots with 520 horses and 150 cavalry horses, the majority of which remained buried in the pits nearby Qin Shi Huang's mausoleum. Other terracotta non-military figures were found in other pits, including officials, acrobats, strongmen and musicians.", "9000040", "500003", ["2-3 hours to vist", "ticket price changes", "strongly recommend"], ["Qin Shi Huang", "Mi Yue", "Qin Dynasty"], "60022");
                                        let XianSite_2 = createSite("7778", "Giant Wild Goose Pagoda", 33, 108, "No.3 Guangchang East Road, Yanta District, Xian", "Bus No.21/521 to Dayantan Stop", "Free", "No closing time / Fountain Show end at 9:00PM", "No Number", "https://en.wikipedia.org/wiki/Giant_Wild_Goose_Pagoda", "Giant Wild Goose Pagoda or Big Wild Goose Pagoda, is a Buddhist pagoda located in southern Xian, Shaanxi province, China. It was built in 652 during the Tang dynasty and originally had five stories. The structure was rebuilt in 704 during the reign of Empress Wu Zetian, and its exterior brick facade was renovated during the Ming dynasty. One of the pagoda's many functions was to hold sutras and figurines of the Buddha that were brought to China from India by the Buddhist translator and traveler Xuanzang.", "9000041", "500003", ["Musical Fountain Show", "night scene", "strongly recommend"], ["Dayanta", "Built in 652", "Tang dynasty"], "60022");
                                        let XianSite_3 = createSite("7779", "Huaqing Pool", 34, 108, "No.038 Huaqing Road, Lintong District, Xian", "Bus No.306", "¥120-150", "6:30PM", "(+86)029-83812003", "http://www.hqc.cn/", "Huaqing Pool or the Huaqing Hot Springs are a complex of hot springs located in an area characterized by mild weather and scenic views at the northern foot of Mount Li, one of the three major peaks of the Qin Mountains. The Huaqing Hot Springs are located approximately 25 km east of Xian (formerly Changan, the western capital of the Tang dynasty), now in the province of Shaanxi, China. It was built in 723 by Emperor Xuanzong of the Tang dynasty as part of the Huaqing Palace, using the locally-occurring geothermal heating, and is famous as the supposed scene of Xuanzong's romance with his consort Yang Guifei. This site was also the scene of the 1936 Xian Incident, when Chiang Kai-shek was kidnapped by former warlord Zhang Xueliang and forced to participate in a United Front with the Chinese Communist Party to oppose Japanese encroachment on China.", "9000042", "500003", ["1-2 hours to visit", "Need guide to explain", "strongly recommend"], ["Huaqing Palace", "Tang Dynasty", "Yang Guifei"], "60022");

                                        listOfSites.push(BeijingSite_1, BeijingSite_2, BeijingSite_3, ShanghaiSite_1, ShanghaiSite_2, ShanghaiSite_3, XianSite_1, XianSite_2, XianSite_3);
                                        return siteCollection.insertMany(listOfSites).then(() => {
                                            console.log("Done seeding for site!");
                                            return db.collection("food").drop().then(function () {
                                                return db;
                                            }, function () {
                                                return db;
                                            }).then((db) => {
                                                return db.createCollection("food");
                                            }).then(function (foodCollection) {
                                                let createFood = (id, name, description, locationlat, locationlnt, address, price, closingTime, phone, website, mainImage, type, cityId) => {
                                                    return {
                                                        _id: id,
                                                        name: name,
                                                        description: description,
                                                        locationlat: locationlat,
                                                        locationlnt: locationlnt,
                                                        address: address,
                                                        price: price,
                                                        closingTime: closingTime,
                                                        phone: phone,
                                                        website: website,
                                                        mainImage: mainImage,
                                                        type: type,
                                                        cityId: cityId
                                                    }
                                                };

                                                let listOfFood = [];
                                                //BeijingFood
                                                let BeijingFood_1 = createFood("8881", "Peking duck", "Peking Duck is a famous duck dish from Beijing that has been prepared since the imperial era. The meat is prized for its thin, crisp skin, with authentic versions of the dish serving mostly the skin and little meat, sliced in front of the diners by the cook. Ducks bred specially for the dish are slaughtered after 65 days and seasoned before being roasted in a closed or hung oven. The meat is eaten with scallion, cucumber and sweet bean sauce with pancakes rolled around the fillings. Sometimes pickled radish is also inside, and other sauces (like hoisin sauce) can be used.", 39, 116, "No.30 Qianmen Road, Dongcheng District, Beijing", "¥150", "8:00PM", "(+86)010-65112418", "https://en.wikipedia.org/wiki/Peking_duck", "9000031", "400001", "60020");
                                                let BeijingFood_2 = createFood("8882", "Beijing Zhajiangmian", "Zhajiangmian, also noodles in soybean paste, is a Chinese dish consisting of thick wheat noodles topped with zhajiang sauce. Zhajiang sauce is normally made by simmering stir-fried ground pork or beef with salty fermented soybean paste. In Beijing cuisine, yellow soybean paste is used, while in Tianjin and other parts of China sweet bean sauce, hoisin sauce, or broad (fava) bean sauce may be used in place of the yellow soybean paste. Soy sauce can also be used instead of the soybean paste. Zhajiang sauce also means fried sauce in Chinese. Although the sauce itself is made by stir-frying, this homonym does not carry over into the Traditional Chinese term, which describes the actual bean paste.", 37, 118, "No.64 Wusi Road, Dongcheng District, Beijing", "¥20", "9:00PM", "(+86)010-67056705", "https://en.wikipedia.org/wiki/Zhajiangmian", "9000032", "400001", "60020");
                                                let BeijingFood_3 = createFood("8883", "Beijing Baodu", "Baodu is a halal dish originated from the Hui minority group people in the northern part of China, but became outstandingly popular around Beijing. The term Baodu can be loosely translated as “exploding belly” in English, but of course, the dish doesn’t require blowing up anything. Since Bao basically means cooking the materials with extremely high temperature like tossing it in the very hot oil, Baodu generally involves cooking the cow or sheep’s stomach in that method. The preparation of the dish is actually rather simple, slicing the various parts of the cow or sheep’s stomach into small pieces, and then submerge them into extremely hot water, oil or soup for a very short amount of time, usually a few to dozens of seconds, and then taking them out and placing them on the plates. On the side, a small plate of sauce would be served for dipping, which is usually made from mixing the sesame paste, Chinese chives, fermented bean curd, vinegar, fish sauce, garlic, spring onion, coriander and so on.", 35, 116, "No.56 Langfang erTiao Road, Xicheng District, Beijing", "¥45", "9:00PM", "(+86)010-83558088", "http://www.chinatours.com/travel-guide/beijing/food/baodu.html", "9000033", "400001", "60020");
                                                //ShanghaiFood
                                                let ShanghaiFood_1 = createFood("8884", "Shengjian mantou", "Shengjian mantou is a type of small, pan-fried baozi(steamed buns) which is a specialty of Shanghai. It is usually filled with pork and gelatin that melts into soup/liquid when cooked. Shengjian mantou has been one of the most common breakfast items in Shanghai since the early 1900s. As a ubiquitous breakfast item, it has a significant place in Shanghainese culture.", 31, 121, "2nd Floor, No.269 Wujiang Road, Jingan District, Shanghai", "¥15", "10:00PM", "(+86)021-61361391", "https://en.wikipedia.org/wiki/Shengjian_mantou", "9000037", "400001", "60021");
                                                let ShanghaiFood_2 = createFood("8885", "Xiaolongbao", "Xiaolongbao is a type of steamed bun (baozi) from the Jiangnan region of China, especially associated with Shanghai and Wuxi. It is traditionally prepared in xiaolong, small bamboo steaming baskets, which give them their name. Xiaolongbao are often referred to as a kind of dumpling, but should not be confused with British or American-style dumplings nor with Chinese jiaozi. Similarly, they are considered a kind of soup dumpling but should not be confused with other larger varieties of tang bao. In Shanghainese, they are also sometimes known as sioh-lon meu-doe or xiaolong-style mantous.", 31, 121, "2nd Floor, Huangpuhui, No.269 Wujiang Road, Jingan District, Shanghai", "¥50", "9:00PM", "(+86)021-63554206", "https://en.wikipedia.org/wiki/Xiaolongbao", "9000038", "400001", "60021");
                                                let ShanghaiFood_3 = createFood("8886", "Wonton", "A wonton (also spelled wantan, wanton, or wuntun in transcription from Cantonese; Mandarin: húndun) is a type of dumpling commonly found in a number of Chinese cuisines.", 31, 121, "No.172 Yanchang Road, Zhabei District, Shanghai", "¥10", "8:00PM", "No Number", "https://en.wikipedia.org/wiki/Wonton", "9000039", "400001", "60021");
                                                //XianFood
                                                let XianFood_1 = createFood("8887", "Yangrou Paomo", "Paomo is a specialty of Shaanxi cuisine and is a typical food eaten in the city of Xian. It is a hot stew of chopped-up steamed leavened bread (known regionally as mo or mantou; pinyin: mó; pinyin: mántóu), cooked in lamb broth and served with lamb meat, sometimes substituted with beef. Yangrou Paomo (flat bread soaked in lamb soup; pinyin: Yángròu pàomó) is made of lamb soup and a great amount of flat bread. When making this dish, the cook breaks the bread into small pieces and adds them to the lamb soup. The beef version is niurou paomo (pinyin: Niúròu pàomó). Paomo is often eaten with pickled garlic and chili sauce.", 33, 108, "No.127 Xiyangshi Road, Bilin District, Xian", "¥35", "10:00PM", "(+86)15829789948", "https://en.wikipedia.org/wiki/Paomo", "9000043", "400001", "60022");
                                                let XianFood_2 = createFood("8888", "Roujiamo", "Roujiamo, also known as rougamo or rou jia mo, meaning meat burger or meat sandwich, is a street food originating from Shaanxi Province and now widely consumed all over China. The meat is most commonly pork, stewed for hours in a soup containing over 20 spices and seasonings. Although it is possible to use only a few spices (which many vendors do), the resulting meat is less flavorful.", 33, 108, "No.53 Zhubashi Road, Bilin District, Xian", "¥15", "8:30PM", "(+86)029-87273917", "https://en.wikipedia.org/wiki/Roujiamo", "9000044", "400001", "60022");
                                                let XianFood_3 = createFood("8889", "Liangpi", "Liangpi is a noodle-like Chinese dish made from wheat or rice flour. It is a specialty dish originating from the Chinese province of Shaanxi, but has now spread to many other places in China, in particular the northern and central regions. Although liangpi is served cold, they are served in every season, including winter. New York Times' Julia Moskin describes liangpi as served at Xian Famous Foods as a dish of cold noodles in a sauce that hits every possible flavor category (sweet, tangy, savory, herbal, nutty and dozens of others).", 33, 108, "Xinsi Road, Gaoxin District, Xian", "¥10", "10:00PM", "(+86)15129288416", "https://en.wikipedia.org/wiki/Liangpi", "9000045", "400001", "60022");

                                                listOfFood.push(BeijingFood_1, BeijingFood_2, BeijingFood_3, ShanghaiFood_1, ShanghaiFood_2, ShanghaiFood_3, XianFood_1, XianFood_2, XianFood_3);

                                                return foodCollection.insertMany(listOfFood).then(() => { 
                                                    console.log("Done seeding for food!");
                                                    return db.collection("comment").drop().then(function () {
                                                        return db;
                                                    }, function () {
                                                        return db;
                                                    }).then((db) => {
                                                        return db.createCollection("comment");
                                                    }).then(function (commentCollection) {
                                                        let createComment = (id, content, createTime, stars, userId, belongToId) => {
                                                            return {
                                                                _id: id,
                                                                content: content,
                                                                createTime: createTime,
                                                                stars: stars,
                                                                userId: userId,
                                                                belongToId: belongToId
                                                            }
                                                        };    

                                                        let listOfComments = [];                                   

                                                        let BeiJingCityComment = createComment("5551", "Capital of China, history of culture.", "2016/12/01", "5", "5622121", "60020");
                                                        let ShangHaiCityComment = createComment("5552", "Economic Center.", "2016/12/02", "5", "5622121", "60021");
                                                        let ShenZhenCityComment = createComment("5553", "Open to the World.", "2016/12/03", "5", "5622122", "60022");
                                                        let QianFoMountainSiteComment = createComment("5554", "Height is moderate, religious mountain.", "2016/12/04", "5", "5622122", "7771");
                                                        let DaMingLakeSiteComment = createComment("5555", "HuanZhu GeGe", "2016/12/05", "5", "5622122", "7772");
                                                        let BaoTuFountainSiteComment = createComment("5556", "The Big Brother of the 72 Springs", "2016/12/06", "5", "5622121", "7773");
                                                        let BaZiRouFoodComment = createComment("5557", "BengRouGanFan", "2016/12/07", "5", "5622121", "8881");
                                                        let TianMoFoodComment = createComment("5558", "BreakFast Delicious Porridge", "2016/12/08", "5", "5622122", "8882");
                                                        let YouXuanFoodComment = createComment("5559", "Fried Dogh", "2016/12/09", "5", "5622122", "8883");
                                                        let blog1Comment = createComment("55510", "Make Sense!", "2016/12/10", "5", "5622121", "50331");
                                                        let blog2Comment = createComment("55511", "Nonsense", "2016/12/11", "5", "5622121", "50332");
                                                        let blog3Comment = createComment("55512", "Not bad", "2016/12/12", "5", "5622122", "50333");

                                                        listOfComments.push(BeiJingCityComment, ShangHaiCityComment, ShenZhenCityComment, QianFoMountainSiteComment, DaMingLakeSiteComment, BaoTuFountainSiteComment, BaZiRouFoodComment, TianMoFoodComment, YouXuanFoodComment, blog1Comment, blog2Comment, blog3Comment);
                                                        return commentCollection.insertMany(listOfComments).then(() => { 
                                                            console.log("Done seeding for comments!");
                                                            return db.collection("blog").drop().then(function () {
                                                                return db;
                                                            }, function () {
                                                                return db;
                                                            }).then((db) => {
                                                                return db.createCollection("blog");
                                                            }).then(function (blogCollection) {
                                                                let createBlog = (id, title, content, mainImage, conclusions, type, tag, userId, siteId) => {
                                                                    return {
                                                                        _id: id,
                                                                        title: title,
                                                                        content: content,
                                                                        createTime: new Date("<YYYY-mm-dd>"),
                                                                        mainImage: mainImage,
                                                                        conclusions: conclusions,
                                                                        type: type,
                                                                        tag: tag,
                                                                        userId: userId,
                                                                        siteId: siteId
                                                                    }
                                                                };
                                                                
                                                                let list = [];
                                                                let blogContent =`Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed blandit massa vel mauris sollicitudin dignissim. Phasellus ultrices tellus eget ipsum ornare molestie scelerisque eros dignissim. Phasellus fringilla hendrerit lectus nec vehicula. ultrices tellus eget ipsum ornare consectetur adipiscing elit.Sed blandit estibulum aliquam neque nibh, sed accumsan nulla ornare sit amet`;

                                                                // blog_1 Beijing
                                                                let blog1 = createBlog("50331", "blog1", blogContent, "900021","conclusions", "300001",["tag1", "tag2"],"5622121","7771");

                                                                // blog_2 Shanghai
                                                                let blog2 = createBlog("50332", "blog2", blogContent, "900022", "conclusions", "300001",["tag1", "tag2"],"5622121","7772");

                                                                // blod_3 Shenzhen
                                                                let blog3 = createBlog("50333", "blog3", blogContent, "900023", "conclusions", "300001",["tag1", "tag2"],"5622121","7773");
                                                                list.push(blog1, blog2, blog3);
                                                                return blogCollection.insertMany(list).then(() => {
                                                                    console.log("Done seeding for blog!");
                                                                    console.log("Done seeding database!");
                                                        
                                                                }).then((addedAll) => {    
                                                                    db.close();
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }, (error) => {
        console.error(error);
    });
});

