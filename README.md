# iTravel
Our project is going to design a travelling website serving as an information platform
for people who are interested in travel. Here, you can search the travel information you
want as well as share your own travel experience! We are focusing on most of the
famous tourist cities in China and provide information including city introductions,
scenic spot manuals, gourmet food recommendations, etc. In a word, we are aimed to
cover the information that users may be interested in as much as possible.
Note: In order to simplify this project, the target travel country is now limited to China.

# 1. Preparation work:
1) Connect the mongodb service
2) Enter the corresponding iTravel folder
3) Update the npm modules to load all dependencies (npm update)
4) Enter the “tasks” folder and run the seed.js (node seed.js) to insert all the data into
the mongodb
5) Return to the iTravel folder
6) Run the project (node app.js or npm start)
2. How to use the Function Modules:
Note: Wherever you are, you can return to the Home Page by clicking the iTravel
logo above the navigation bar.
# I. User:
1) User registration
a) Homepage → Navigation bar → Click “SIGN UP”
2) User login
a) Homepage → Navigation bar → Click “LOGIN” (Reminder: When you login
successfully, it will show the welcome “XXX”)
3) User logout
a) Homepage → Navigation bar → Click “LOGOUT”
4) If a new visiter would like to post a comment, he/she must login our webiste first.
(Redict to the LOGIN and SIGN UP links above)
# II.City:
1) Check the city list (including all the cities provided by our website).
a) Homepage → Navigation bar → Click “Cities” → City Gallery
b) One city page → Bar “Home / All Cities / City Name” → Click “All Cities”
2) Check a single city (including detailed information of a specific city).
a) City Gallery (http://localhost:3000/city) → Click a city
b) Homepage → Cities part → Click a city
3) Check a site of a city
a) One city page → Sites part → Click a site
4) Check a food of a city
a) One city page → Food part → Click a food
5) Leave a comment
a) One city page → Comments part → Write down your comment → Submit
# III.Site(under the certain city):
Home → Cities → Site(You can click the site link in one city)
1) The visitor can check one specific site detail information.
2) The visitor can zoomingly use the Google Map API to find the accurate loaction.
3) The visitor can view all the comments about this site.4) If the visitor would like to post an individual comment, he/she must login fisrt. And
then as a user, they can post a comment and this new comment will appear in the
comment displayment area immediately.
IV.Food(under the certain city):
Home → Cities → Food(You can click the food link in one city)
1) The visitor can check one specific food detail information.
2) The visitor can zoomingly use the Google Map API to find the accurate food loaction.
3) The visitor can view all the comments about this food.
4) If the visitor would like to post an individual comment, he/she must login fisrt. And
then as a user, they can post a comment and this new comment will appear in the
comment displayment area immediately.
# V.Blog:
1) Have a glance over our blogs
a) Homepage → Popular Blogs part → Have a glance over three popular blogs
2) Check the blog list (including all the blogs in our website).
a) Homepage → Navigation bar → Click “Blog” → All Blogs
b) One blog page → Bar “Home / All Blogs / Blog Name” → Click “All Blogs”
3) Check a single blog
a) All Blogs (http://localhost:3000/blog/) → Click a blog
4) Leave a comment
a) One blog page → Comments part → Write down your comment → Submit
5) Create a new blog
a) BlogPage → Click ”Create New Blog”
You can write your own blog including the travelling experience and the uploaded
pictures. (Reminder: we just suppport the picture uploading function, so the file type
should be the picture postfix.)
6) Return to the blog page
a) CreateBlogPage → Click ”Blog List” Button
# VI.PhotoWall:
Homepage → Navigation bar → Click “Photowall”
1) Show all the images of different categories posted by admins or users.
2) When you click one of these picture, we will show the photowall. You will focus on
one specific picture and view the previous and latter picture by clicking the oriented
arrows.
# VII.About:
Homepage → Navigation bar → Click “About”
1) Check our project introduction
2) Check our team information
All above are the instructions of our final project iTravel.
Thank you!
