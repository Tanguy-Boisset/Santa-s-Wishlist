# 🎅 Santa's Wishlist 🎄
Create and share your Christmas wishlists to your friends to help Santa find what kind of gifts you want !\
⚠️ This project is a school project designed to demonstrate and exploit some web vulnerabilities.

## 🇫🇷 Consigne
Santa's little helper : cette application web permet aux membres d'un groupe de gérer une ou des listes de souhaits pour des cadeaux de Noël, et de choisir dans la liste d'autres personnes ce qu'ils pourront leur offrir (l'application garantissant l'absence de conflits et préservant au maximum la surprise). Différentes améliorations peuvent être imaginées, comme l'organisation d'un événement de type "secret santa", des facilités dans l'interactions avec des sites marchants, l'envoi de messages éventuellement anonymes...

## 👷 Installation
TODO

## 🎁 Functionalities
The user can create an account. When logged in, he can create a new wishlist for himself or see his other wishlists. To sign in, the following information are needed :
- a name
- a surname
- a pseudonym
- a password
- (TBI : email for password recovery. For now : DON'T FORGET YOU PASSWORD !)
- (TBI : a profile picture)

To create a wishlist, the user must give it a name. He then gets a unique link he can share to his friends (TBI : invite through in-website pseudonym). This link must be some kind of a hash to not be easily findable.

On a wishlist the user has created, he can add, edit or remove gifts. A gift is composed of (* = mandatory) :
- a name*
- a description
- a link (to Amazon for example)
- a price
- (TBI : a picture)

When a friend is given a link to a wishlist, he must log in and then gets redirected to the wishlist. He's added to the wishlist and can see all the gifts and other friends. The wishlist is automaticaly added to his wishlists on his profile to be accessed quickly.

On a wishlist, a friend can choose a gift he wants to buy. The gift is then marked as bought and cannot be selected by another friend (TBI : multiple friends should be able to buy the same gift together). The owner of the wishlist cannot see which gifts are already selected.

The owner of a wishlist can delete it at any time.

## 🕸️ Structure
**Main page :** home webpage explaining the concept of the website.

**Sign in :** quick form to create an account on the website.

**Log in :** form to log in. Only the pseudonym and password are needed.

The following pages require the user to be logged in :

**My Wishlists :** see your wishlists and invite some friends with the link. Add, edit or remove gifts or delete the wishlist.

**Friends' Wishlists :** access the wishlists you are invited to and choose some gifts you will buy to them. You can see which gifts are available.
