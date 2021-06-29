# Nodefeed page functional specification

## User story

The user is able to visit a nodefeed page of a given product.
Whereby he can post , share, comment , like semantic posts


## Feature list
* The page in itself
* Page creation (E0)
* Semantic Post (PostModule ,but I need a basic one though) (E0) (the only original feature)
* Follow a page (E0)
* You can rate a page and share it (E0) ( as a link for amazon for example)
* Social interaction with posts
* Home feed (E1)
* Related nodefeeds
* Filter a given nodefeed page
* Ressources side nav zone
* You need to think harder about cutting edge features 
### Page creation
The user is able to create a nodefeed page of a given product:
3 questions arises: 
* How to indentify a given nodefeed.
* Should we and how we set and enforce a granularity ? (Iphone , vs several iphone pages)
* How to verify that a given product exists ?

Several clues on how to possibly uniquely indentify a nodefeed.

[Q1] Simply using title without spaces with a point (a la facebook).
If already exist, signal that the page already exist and don't create it
This works assuming you don't have 2 different products with the same name, which in this case should be dealt by the user and choosing a better name (with the potential guidance of a mod down the line if current posted name is inappropriate)

[Q3] Basic name checking. Also use UX guidance to avoid maximally this situation. Then Moderation to remove wrong pages

[Q2] I am tempted to say that the communities collectively decide with their follow vote to choose a product or not. I think the only thing that I can do is to setup incentives to promote one particular direction.

