***Member Name, Student ID, Responsibilities & Contribution***

Muhammad Zahran 0139186
Responsibilites: Mainly Payment (checkout) page
-add unique feature (promotional discount function)
-add unique feature (vegetarian indicator, and special dietary)
-improving the UI and add error handling such as adding "Added" button when adding a menu
-using pop up message for error handling notifier
-configured payment page


Gee Lok Thim 0139385
Responsibilities: Mainly "Your Order" (cart) page  
-Improve UI 
-Implement quantity +/– controls, blocking negative quantities
-Implement item removal button to completely remove a food/drink item
-Calculation for item count, price per item, and subtotal of an item in RM with 2 decimals
-Make sure all totals update immediately when quantity of items change 
-Implement duplicate-item logic, adding same item again increases quantity not a new row
-Implement a Order Summary receipt section before and after finishing payment
-Implement unique feature: a real time search bar to search for food/drink items based on their names


Wong Zheng Chyi M44100433
Responsibilities: Mainly Menu page and overall UI 
-Enhanced the application's user interface by improving the layout, colour scheme, typography, spacing, and overall visual design.
-Refined the buttons, icons, and menu cards to create a cleaner, more consistent, and user-friendly interface.


***Pixel Café - Mobile Ordering App***
Pixel Café is a React Native mobile application designed for café customers to browse food and drink items, customize order quantities, apply promo codes, and complete their checkout.


***Features***
1) Welcome Screen: Clean landing page introducing the café, current promotions, and a quick start button.

2) Menu Browsing & Search: Displays food and drink items with real-time text searching.Shows visual dietary badges (Vegetarian, Vegan, Dairy-free, Gluten, Caffeine) for customer safety.Shows instant feedback when an item is added to the cart.

3) Order Management (Cart):Adjust item quantities directly with plus (+) and minus (-) buttons.Completely remove items from the cart.View real-time subtotal calculations.

4) Checkout & Validation:Input fields for customer name and table number (Tables 1-10).Selection between Dine-in and Takeaway options.

5) Input validation for name formats, table numbers, and promo code usage.

6) Promotional Discount System:6-character code validation system that converts inputs to uppercase automatically. Applies instant percentage discounts based on the code entered.

7) Receipt & Confirmation:Itemized receipt breakdown showing individual item totals, discounts, and final payment amount. Confirmation screen with an option to clear current state and start a new order.


***Unique features***
1) Real-Time Search Bar: Allows customers to instantly filter through the menu by typing item names, providing a seamless browsing experience.

2) Dietary & Allergen Badges: Color-coded dietary tags (Vegetarian, Vegan, Dairy-Free, Allergen/Gluten, Caffeine) rendered dynamically on each menu item to help customers make safe food choices.

3) Promotional Discount Code System: Custom discount engine validating 6-character promo codes (e.g., 123456, 654321, ABC123), recalculating subtotals, discounts, and final totals in real time.


***Item Name, Category, Price (RM), Dietary Information***
1. Croissant, Food, RM 7.50, "Vegetarian, Contains dairy, Contains gluten"

2. Chocolate Muffin, Food, RM 6.50, "Vegetarian, Contains dairy, Contains gluten"

3. Blueberry Cheesecake, Food, RM 12.00, "Vegetarian, Contains dairy, Contains gluten"

4. Strawberry Doughnut, Food, RM 4.50, "Vegetarian, Contains dairy, Contains gluten"

5. Latte, Drink, RM 11.00, "Vegetarian, Contains dairy, Contains caffeine"

6. Flat White, Drink, RM 11.00, "Vegetarian, Contains dairy, Contains caffeine"

7. Americano, Drink, RM 8.50, "Vegan, Dairy-free, Contains caffeine"

8. Matcha Latte, Drink, RM 13.00, "Vegetarian, Contains dairy, Contains caffeine"

9. Cappuccino, Drink, RM 10.50, "Vegetarian, Contains dairy, Contains caffeine"


***Data Storage & Handling***
Temporary State Storage: Order data, customer input (Name, Table Number, Dining Choice), and promo code applications are stored temporarily using React's local state (useState). All data persists only during the active app session and is reset upon clicking "Start New Order" to ensure privacy for subsequent customers.


***Mobile Security & Safety Practices Implemented***
1) Strict Input Validation & Sanitization:

-Customer name is validated against regular expressions (/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/) to prevent illegal characters or script injection attempts.

-Table numbers are restricted via keyboard type (number-pad), maximum length rules, and range validation (integers 1 to 10 only).

2) Safe State Handling: 

-Promo code inputs are sanitized against special characters, keeping state free from malformed strings.

-Cross-Platform Message Fallbacks: Handles alerts safely across web and native mobile runtime environments (Platform.OS === 'web' fallback using window.alert vs Alert.alert).


***Built With***
React Native: Core framework for cross-platform app development.Expo / Expo Snack: Sandbox environment for live running and testing.JavaScript / JSX: Application logic and UI layout.


***How to Run the App***
Copy the code from App.js or App.tsx.Open Expo Snack.Replace the code in the default App.js editor with your copied code.
Select your preferred preview platform on the right panel (Web, iOS, or Android).


***Active Promo Codes for Testing***
Promo Code Discount Offered 
123456 10% Off 
654321 30% Off 
ABC123 5% Off


***References and Resource Credits***
Built with React Native and hosted on Expo Snack for instant web and mobile previewing

Unsplash: Stock menu imagery for food and drinks (https://unsplash.com/license)
