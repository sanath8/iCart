# Intelligent-Trolley-System
## A smart trolley which is equipped with accessories capable of increasing marts profits.
### Problem Statement
It is very common to use trolleys in supermarkets, they are machines which help us in easily carrying around a lot of items we wish to purchase in the supermarket. However, the trolleys need not be simple mechanical machines which help us in carrying items, we can extend the services which they provide to a far greater extent by digitalization of these trolleys. 
Some of the common issues faced in super markets are listed below:
In big supermarkets, it is very difficult to contact a sales person every time to find out whether a particular product we want is available or not, to enquire about its price and to know the offers made on that product.
Generally, the number of items on our checklist is large when we are shopping in supermarkets, this means that a greater amount of time is wasted roaming around the mall just to search for the items we want to purchase.
It is very common that we may forget or not come across certain products we wish to purchase in the supermarket, and unlike in e-commerce websites like amazon and flipkart there is no item recommendation system for an individual customer based on his/her taste and other parameters.
Some of the items may be very costly and delicate, these items may fall down and get damaged when the trolley hits them due to the carelessness of the customer.

Approach
    Solution for problem 1
        The entire conversation between the customer and sales representative can be automated by embedding an user interface in the trolly which is capable of natural language processing and dialogue state tracking.
        Use Case:
        User : Hi, are shorts available here?
        Chatbot : Yes
        User : How much do they cost?
        Chatbot : Rs 500
        User : Is there any discount on it?
        Chatbot : 10% off.

    Solution for problem 2
        For solving such problems, having a layout/map of the supermarket is a must. Hence, we first create an user interface in which we have a layout of the supermarket along with all the distinct items in the market marked in their respective positions.
For identifying the position of various items wrt us we make use of IPS(indoor positioning system), using this technology we can obtain the coordinates of various components and customers within the supermarket.
        For minimizing the total distance a customer has to travel to purchase all the products within the market we make use of the travelling salesman problem, where each rack acts as a node and distance between the racks acts as weights. 

        
    Solution for problem 3
        Although there are many parameters which decides a person’s interest in an item the most dominant features would be the person’s age, gender, time of the year and products present in the customers trolley. The ways to obtain these features from the customer is listed below:
age and gender : By attaching a small camera on the opposite side of the trolley we can extract a customers age and gender with the aid of convolutional neural network(CNN).
 time of the year : We can obtain this parameter by using the system date from raspberry pi.
products present in the customers trolley : In solution1 we extract the name of the product for replying, if we keep a track of the product names the customer has requested for throughout his time shopping in the supermarket we can obtain the type of products which the customer his interested in.
Once all the features are extracted and preprocessed they are ready to be feed into a machine learning model like bayes classifier which can provide item recommendations. These recommendations can be displayed on the screen from which the customer chats with the trolley.

    



Solution for problem 4
    The amount of damage which a trolley may do primarily depends on 2 things its proximity to the other object and its speed. By the use of proximity and speed sensors we can set a threshold beyond which the wheels of the trolley would get locked and hence cannot move and harm other items, once the speed of the trolley becomes zero the locks open up.

Result/Conclusion
    A smart trolley is built which not only helps the customer in saving his time and energy, but it is also capable of increasing the owners profits.

