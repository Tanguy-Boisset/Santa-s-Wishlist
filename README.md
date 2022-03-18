# Santa-s-Wishlist
Create and share your Christmas wishlists to your friends to help Santa find what kind of gifts you want !
This project is a school project designed to demonstrate and exploit some web vulnerabilities.

## 🇫🇷 Consigne
Santa's little helper : cette application web permet aux membres d'un groupe de gérer une ou des listes de souhaits pour des cadeaux de Noël, et de choisir dans la liste d'autres personnes ce qu'ils pourront leur offrir (l'application garantissant l'absence de conflits et préservant au maximum la surprise). Différentes améliorations peuvent être imaginées, comme l'organisation d'un événement de type "secret santa", des facilités dans l'interactions avec des sites marchants, l'envoi de messages éventuellement anonymes...

## Installation
TODO

## Functionalities
The user can create an account. When logged in, he can create a new wishlist for himself or see his other wishlists.

To create a wishlist, the user must give it a name. He then gets a unique link he can share to his friends. This link must be some kind of a hash to not be easily findable.

On a wishlist the user has created, he can add or remove gifts. A gift is composed of (* = mandatory) :
- a name*
- a description
- a link (to Amazon for example)
- a price
- (a picture) --> not a priority

When a friend is given a link to a wishlist, he must log in and then gets redirected to the wishlist. He's added to the wishlist and can see all the gifts and other friends. The wishlist is automaticaly added to his wishlists on his profile to be accessed quickly.

On a wishlist, a friend can choose a gift he wants to buy. The gift is then marked as bought and cannot be selected by another friend (TBI : multiple friends should be able to buy the same gift together). The owner of the wishlist cannot see which gifts are already selected.

The owner of a wishlist can delete it at any time.

## Structure
Main page : 
