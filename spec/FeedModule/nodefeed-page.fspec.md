# Nodefeed page functional specification

## User story

The user is able to visit a nodefeed page of a given product.
Whereby he can post , share, comment , like semantic posts

My vision is that a nodefeed page should become the **world reference** in terms of :
 1. A detailed description of the product  (like a product reference that surpasses their own website)
 2. A world class rating reference , linkable and badgable
 3. The "official" community of a given product
 4. Additional features like bug reporting , feedback , idea submission etc. / e-commerce/github plug

## Feature list
* [Page display](#page-display)
* [Page creation](#page-creation)
* Semantic Post (PostModule ,but I need a basic one though) (E0) (the only original feature)
* Follow a page (E0)
* You can rate a page and share it (E0) ( as a link for amazon for example)
* Social interaction with posts
* Home feed (E1)
* Related nodefeeds
* Filter a given nodefeed page
* Ressources side nav zone
* You need to think harder about cutting edge features 

## Page creation
The user is able to create a nodefeed page of a given product:
3 questions arises: 
* How to indentify a given nodefeed.
* Should we and how we set and enforce a granularity ? (Iphone , vs several iphone pages)
* How to verify that a given product exists ?

Several clues on how to possibly uniquely indentify a nodefeed.

* [Q1] Simply using title without spaces with a point (a la facebook).
If already exist, signal that the page already exist and don't create it
This works assuming you don't have 2 different products with the same name, which in this case should be dealt by the user and choosing a better name (with the potential guidance of a mod down the line if current posted name is inappropriate)

* [Q2] I am tempted to say that the communities collectively decide with their follow vote to choose a product or not. I think the only thing that I can do is to setup incentives to promote one particular direction.

* [Q3] Basic name checking. Also use UX guidance to avoid maximally this situation. Then Moderation to remove wrong pages


### Fonctionalities

* The user will be able to create a page after searching a result if he doesn't find the product (Main route)
*  He can also create a nodefeed from home page a la reddit (think of a exotic UX place) In the navbar
*  Only an authenticated user can create a nodefeed


### UI Specs
* Modal (no need of a routable page)
  * 2 step : first check name , give suggestions ala stackoverflow
  * Next step regular form , with validation
* Parameters
   *  The title (will create identifier : name already in use tooltip)
   *  Description
   *  Profile picture 
   *  Category ? get relevant : material / imamterial etc
   *  Link to official product / company


### TSPEC : Private/readonly/special parameters
  * Rating (readonly)
  * Followers (readonly)
  * Profile picture (google cloud thing)
  
Later if business is creating/claiming the page we will add additional information for feature purposes

This is deeply linked to SearchModule.

## Page display

### Fonctionalities
The user should see a page with it's related content and controls  
The page should be accessible through a link
### Specs
* Routable link
* Obvious stuff display the page , connect control to the page id etc
* Rate bar (in the header)
* Follow button (in the header)
* Sidenav: //TODO:
## General considerations
In general I see 2 main type of products (arbitrary distincitons but hey we well in the 21century)

* Digital services. (Non digital services are becoming digital)  
    * RSS FEEDER embedded (twitter community manager, tinder etc )
    * Some sort of github plug
* Physical products   
  * Subproduct selector (filter ? )
  * Some sort of sales/e-commerce plug

See Post module for more granular details

