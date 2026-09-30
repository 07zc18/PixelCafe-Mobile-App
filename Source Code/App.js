import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Platform,
  Image,
} from 'react-native';

export default function App() {
  // Main component that controls the full Pixel Café application
  // Controls which section is displayed
  const [currentScreen, setCurrentScreen] =
    useState('welcome');

  // Shared order/cart data
  // Stores all menu items selected by the customer
  const [order, setOrder] = useState([]);

  // Stores the customer name entered during checkout
  const [customerName, setCustomerName] =
    useState('');

  // Stores the table number entered by the customer
  const [tableNumber, setTableNumber] =
    useState('');

  // Stores whether the order is dine-in or takeaway
  const [diningOption, setDiningOption] =
    useState('Dine-in');

  // Stores the search query entered in the menu search bar (ZAHRAN)
  const [searchQuery, setSearchQuery] =
    useState('');

  // Promotional code information (ZAHRAN)
  const [promoCode, setPromoCode] =
    useState('');

  const [
    appliedPromoCode,
    setAppliedPromoCode,
  ] = useState('');

  const [
    promoDiscountRate,
    setPromoDiscountRate,
  ] = useState(0);

  // Stores the item that was recently added to the cart (ZAHRAN)
  const [
    recentlyAddedItemId,
    setRecentlyAddedItemId,
  ] = useState(null);

  // Displays popup messages on Web, Android and iOS (ZAHRAN)
  const showMessage = (title, message) => {
    if (Platform.OS === 'web') {
      window.alert(
        `${title}\n\n${message}`
      );
    } else {
      Alert.alert(title, message);
    }
  };

  // This list keep all menu item detail like name, price and dietary info
  // Each object below represents one product displayed on the menu
  const menuItems = [
    {
      id: 1,
      name: 'Croissant',
      category: 'Food',
      price: 7.5,
      quantity: 1,
      dietaryInfo: [
        'Vegetarian',
        'Contains dairy',
        'Contains gluten',
      ],
      image:
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 2,
      name: 'Chocolate Muffin',
      category: 'Food',
      price: 6.5,
      quantity: 1,
      dietaryInfo: [
        'Vegetarian',
        'Contains dairy',
        'Contains gluten',
      ],
      image:
        'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 3,
      name: 'Blueberry Cheesecake',
      category: 'Food',
      price: 12.0,
      quantity: 1,
      dietaryInfo: [
        'Vegetarian',
        'Contains dairy',
        'Contains gluten',
      ],
      image:
        'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 4,
      name: 'Strawberry Doughnut',
      category: 'Food',
      price: 4.5,
      quantity: 1,
      dietaryInfo: [
        'Vegetarian',
        'Contains dairy',
        'Contains gluten',
      ],
      image:
        'https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0',
    },
    {
      id: 5,
      name: 'Latte',
      category: 'Drink',
      price: 11.0,
      quantity: 1,
      dietaryInfo: [
        'Vegetarian',
        'Contains dairy',
        'Contains caffeine',
      ],
      image:
        'https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 6,
      name: 'Flat White',
      category: 'Drink',
      price: 11.0,
      quantity: 1,
      dietaryInfo: [
        'Vegetarian',
        'Contains dairy',
        'Contains caffeine',
      ],
      image:
        'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 7,
      name: 'Americano',
      category: 'Drink',
      price: 8.5,
      quantity: 1,
      dietaryInfo: [
        'Vegan',
        'Dairy-free',
        'Contains caffeine',
      ],
      image:
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 8,
      name: 'Matcha Latte',
      category: 'Drink',
      price: 13.0,
      quantity: 1,
      dietaryInfo: [
        'Vegetarian',
        'Contains dairy',
        'Contains caffeine',
      ],
      image:
        'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 9,
      name: 'Cappuccino',
      category: 'Drink',
      price: 10.5,
      quantity: 1,
      dietaryInfo: [
        'Vegetarian',
        'Contains dairy',
        'Contains caffeine',
      ],
      image:
        'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80',
    },
  ];

  // Filters menu items according to the search query typed by the user (ZAHRAN)
  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // This function choose correct colour style for every dietary label
  // Returns the correct style for each dietary label (ZAHRAN)
  const getDietaryBadgeStyle = (information) => {
    if (information === 'Vegetarian') {
      return styles.vegetarianBadge;
    }

    if (information === 'Vegan') {
      return styles.veganBadge;
    }

    if (information === 'Dairy-free') {
      return styles.dairyFreeBadge;
    }

    if (
      information === 'Contains dairy' ||
      information === 'Contains gluten'
    ) {
      return styles.allergenBadge;
    }

    if (information === 'Contains caffeine') {
      return styles.caffeineBadge;
    }

    return null;
  };

  // This function show all dietary badge for one menu item
  // Displays dietary information for a menu item (ZAHRAN)
  const renderDietaryInformation = (item) => {
    return (
      <View style={styles.dietaryInfoRow}>
        {item.dietaryInfo.map((information) => (
          <Text
            key={information}
            style={[
              styles.dietaryBadge,
              getDietaryBadgeStyle(information),
            ]}
          >
            {information}
          </Text>
        ))}
      </View>
    );
  };

  // This function add selected menu item into customer order
  // When same item already exist, the quantity will increase
  // Adds an item to the shared order
  const addToOrder = (menuItem) => {
    // Searches the current order to check whether this item already exists
    const existingItem = order.find(
      (item) => item.id === menuItem.id
    );

    if (existingItem) {
      // Creates a new order array with the selected item quantity increased
      const updatedOrder = order.map((item) =>
        item.id === menuItem.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      setOrder(updatedOrder);
    } else {
      // Adds a new item when it is not already inside the order
      setOrder([
        ...order,
        {
          ...menuItem,
          quantity: 1,
        },
      ]);
    }

    // Temporarily changes the Add button to green (ZAHRAN)
    setRecentlyAddedItemId(menuItem.id);

    setTimeout(() => {
      setRecentlyAddedItemId(null);
    }, 1200);
  };

  // This part calculate how many item customer selected
  // Calculate order values (LOKTHIM)
  const totalItems = order.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  // This calculate total price before promotional discount
  const subtotal = order.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  // For View Cart number (LOKTHIM)
  const totalItemCount =
    order.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  // This calculate discount amount and final price customer need pay
  // Promotional discount calculation (ZAHRAN)
  // Multiplies the subtotal by the active promotional discount rate
  const promotionalDiscount =
    subtotal * promoDiscountRate;

  // Calculates the amount payable after the discount is deducted
  const finalTotal =
    subtotal -
    promotionalDiscount;

  // This function remove one full item from the cart
  // Removes an item (LOKTHIM)
  const removeItem = (id) => {
    setOrder(
      order.filter(
        (item) => item.id !== id
      )
    );
  };

  // This function increase or decrease item quantity
  // Item will be removed when quantity become zero
  // Updates quantity (LOKTHIM)
  const updateQuantity = (
    id,
    change
  ) => {
    const updatedOrder = order
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity +
                change,
            }
          : item
      )
      .filter(
        (item) =>
          item.quantity > 0
      );

    setOrder(updatedOrder);
  };

  // This check cart before user open it
  // Prevents the cart from opening when no item is selected (ZAHRAN)
  const openCart = () => {
    if (order.length === 0) {
      showMessage(
        'No Items Selected',
        'Please select at least one food or drink before opening the cart.'
      );

      return;
    }

    setCurrentScreen('cart');
  };

  // This stop user going checkout when cart still empty
  // Prevents checkout when the cart is empty (ZAHRAN)
  const openCheckout = () => {
    if (order.length === 0) {
      showMessage(
        'Empty Cart',
        'Please add at least one item before continuing to checkout.'
      );

      return;
    }

    setCurrentScreen('checkout');
  };

  // This only allow proper alphabet, space, apostrophe and hyphen for name
  // Validates customer name (ZAHRAN)
  const isValidCustomerName = (
    name
  ) => {
    // Regular expression accepts letters, spaces, apostrophes and hyphens
    const namePattern =
      /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

    return namePattern.test(name);
  };

  // This clean promo input and change all letter into uppercase
  // Handles promotional code input changes (ZAHRAN)
  const handlePromoCodeChange = (
    text
  ) => {
    // Allows letters and numbers only
    const lettersAndNumbersOnly =
      text.replace(
        /[^A-Za-z0-9]/g,
        ''
      );

    // Converts letters to uppercase
    const formattedCode =
      lettersAndNumbersOnly.toUpperCase();

    setPromoCode(formattedCode);

    /*
      Removes the previous discount when the customer
      changes an already applied promotional code.
    */
    if (
      formattedCode !==
      appliedPromoCode
    ) {
      setAppliedPromoCode('');
      setPromoDiscountRate(0);
    }
  };

  // This check promo code format and give correct discount rate
  // Validates and applies the promotional code (ZAHRAN)
  const applyPromoCode = () => {
    // Removes extra spaces and standardises the code as uppercase
    const trimmedPromoCode =
      promoCode
        .trim()
        .toUpperCase();

    if (
      trimmedPromoCode === ''
    ) {
      showMessage(
        'Promotional Code Required',
        'Please enter a six-character promotional code.'
      );

      return;
    }

    if (
      !/^[A-Z0-9]{6}$/.test(
        trimmedPromoCode
      )
    ) {
      showMessage(
        'Invalid Code Format',
        'The promotional code must contain exactly six letters or numbers.'
      );

      return;
    }

    // First valid promotional code gives a 10 percent discount
    if (
      trimmedPromoCode ===
      '123456'
    ) {
      setAppliedPromoCode(
        trimmedPromoCode
      );

      setPromoDiscountRate(0.1);

      showMessage(
        'Code Applied',
        'Promotional code accepted. You received a 10% discount.'
      );

      return;
    }

    // Second valid promotional code gives a 30 percent discount
    if (
      trimmedPromoCode ===
      '654321'
    ) {
      setAppliedPromoCode(
        trimmedPromoCode
      );

      setPromoDiscountRate(0.3);

      showMessage(
        'Code Applied',
        'Promotional code accepted. You received a 30% discount.'
      );

      return;
    }

    // Third valid promotional code gives a 5 percent discount
    if (
      trimmedPromoCode ===
      'ABC123'
    ) {
      setAppliedPromoCode(
        trimmedPromoCode
      );

      setPromoDiscountRate(
        0.05
      );

      showMessage(
        'Code Applied',
        'Promotional code accepted. You received a 5% discount.'
      );

      return;
    }

    setAppliedPromoCode('');
    setPromoDiscountRate(0);

    showMessage(
      'Invalid Promotional Code',
      'The promotional code you entered is not recognised.'
    );
  };

  // This check all required checkout information before order confirm
  // Validates all checkout information (ZAHRAN)
  const validateOrder = () => {
    if (order.length === 0) {
      showMessage(
        'Empty Order',
        'Please add at least one item before confirming the order.'
      );

      return false;
    }

    // Removes unnecessary spaces before validating the customer name
    const trimmedName =
      customerName.trim();

    if (trimmedName === '') {
      showMessage(
        'Name Required',
        'Please enter the customer name.'
      );

      return false;
    }

    if (
      trimmedName.length < 2
    ) {
      showMessage(
        'Invalid Name',
        'The customer name must contain at least two characters.'
      );

      return false;
    }

    if (
      !isValidCustomerName(
        trimmedName
      )
    ) {
      showMessage(
        'Invalid Name',
        'The customer name may contain letters, spaces, apostrophes and hyphens only.'
      );

      return false;
    }

    if (
      tableNumber.trim() === ''
    ) {
      showMessage(
        'Table Number Required',
        'Please enter a table number from 1 to 10.'
      );

      return false;
    }

    // Converts the table number text into a number for range checking
    const numericTableNumber =
      Number(tableNumber);

    if (
      !Number.isInteger(
        numericTableNumber
      ) ||
      numericTableNumber < 1 ||
      numericTableNumber > 10
    ) {
      showMessage(
        'Invalid Table Number',
        'The table number must be a whole number from 1 to 10.'
      );

      return false;
    }

    /*
      The promotional code is optional.
      When a customer enters a code, it must be applied successfully.
    */
    if (
      promoCode.trim() !== '' &&
      appliedPromoCode === ''
    ) {
      showMessage(
        'Promotional Code Not Applied',
        'Please apply a valid promotional code or clear the promotional-code field.'
      );

      return false;
    }

    return true;
  };

  // This only move to confirmation screen when all validation already pass
  // Confirms the order after validation (ZAHRAN)
  const confirmOrder = () => {
    if (!validateOrder()) {
      return;
    }

    setCurrentScreen(
      'confirmation'
    );
  };

  // This reset all order data so new customer can start again
  // Clears temporary data after confirmation (ZAHRAN)
  const startNewOrder = () => {
    setOrder([]);
    setCustomerName('');
    setTableNumber('');
    setDiningOption('Dine-in');
    setSearchQuery('');
    setPromoCode('');
    setAppliedPromoCode('');
    setPromoDiscountRate(0);
    setRecentlyAddedItemId(null);
    setCurrentScreen('welcome');
  };

  // This function build the first welcome page
  const renderWelcomeScreen =
    () => {
      return (
        <View
          style={
            styles.centeredScreen
          }
        >
          <Image
            source={{
              uri: '',
            }}
            style={
              styles.logoImage
            }
          />

          <Text
            style={styles.mainTitle}
          >
            Pixel Café
            <Text
              style={styles.logo}
            ></Text>
          </Text>

          <Text
            style={styles.subtitle}
          >
            Fresh Coffee,{'\n'}
            Fresh Moments
          </Text>

          <Text
            style={
              styles.description
            }
          >
            ✓ Premium Roast
            Arabica Coffee{'\n'}
            ✓ Promotional Discounts
            up to 30%
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              setCurrentScreen(
                'menu'
              )
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Start Order
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

  // This function show all food and drink menu to customer
  const renderMenuScreen = () => {
    return (
      <ScrollView
        contentContainerStyle={
          styles.screenContent
        }
      >
        <Text
          style={
            styles.sectionTitle
          }
        >
          Today's Menu
        </Text>

        {/* Search bar input for searching menu items (ZAHRAN) */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search food or drinks..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Special dietary information guide (ZAHRAN) */}
        <View
          style={
            styles.dietaryGuide
          }
        >
          <Text
            style={
              styles.dietaryGuideTitle
            }
          >
            Special Dietary
            Information
          </Text>

          <Text
            style={
              styles.dietaryGuideText
            }
          >
            Check each item for
            vegetarian, vegan, dairy,
            gluten and caffeine
            information.
          </Text>
        </View>

        {/* Displays filtered menu items or 'No items found' message (ZAHRAN) */}
        {filteredMenuItems.length === 0 ? (
          <View style={styles.noItemsContainer}>
            <Text style={styles.noItemsText}>
              No items found
            </Text>
          </View>
        ) : (
          filteredMenuItems.map((item) => (
            <View
              key={item.id}
              style={styles.card}
            >
              <Image
                source={{
                  uri: item.image,
                }}
                style={
                  styles.itemImage
                }
              />

              <View
                style={
                  styles.itemTextContainer
                }
              >
                <Text
                  style={
                    styles.itemName
                  }
                >
                  {item.name}
                </Text>

                <Text
                  style={
                    styles.itemInformation
                  }
                >
                  Category:{' '}
                  {item.category}
                </Text>

                {renderDietaryInformation(
                  item
                )}

                <Text
                  style={
                    styles.itemPrice
                  }
                >
                  RM{' '}
                  {item.price.toFixed(
                    2
                  )}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.smallButton,
                  recentlyAddedItemId ===
                    item.id &&
                    styles.addedButton,
                ]}
                onPress={() =>
                  addToOrder(item)
                }
              >
                <Text
                  style={[
                    styles.buttonText,
                    recentlyAddedItemId ===
                      item.id &&
                      styles.addedButtonText,
                  ]}
                >
                  {recentlyAddedItemId ===
                  item.id
                    ? 'Added'
                    : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={openCart}
        >
          <Text
            style={styles.buttonText}
          >
            View Cart (
            {totalItemCount})
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  // This function show selected items, quantity and remove button
  const renderCartScreen = () => {
    return (
      <ScrollView
        contentContainerStyle={
          styles.screenContent
        }
      >
        <Text
          style={
            styles.sectionTitle
          }
        >
          Your Order
        </Text>

        {order.length === 0 ? (
          <Text
            style={styles.emptyText}
          >
            No items in the order.
          </Text>
        ) : (
          order.map((item) => (
            <View
              key={item.id}
              style={
                styles.cartCard
              }
            >
              <Image
                source={{
                  uri: item.image,
                }}
                style={
                  styles.itemImage
                }
              />

              {/* Left side: Item information */}
              <View
                style={styles.cartLeft}
              >
                <Text
                  style={
                    styles.itemName
                  }
                >
                  {item.name}
                </Text>

                <Text
                  style={
                    styles.itemInformation
                  }
                >
                  RM{' '}
                  {item.price.toFixed(
                    2
                  )}
                </Text>

                {renderDietaryInformation(
                  item
                )}
              </View>

              {/* Right side: Quantity, total, remove */}
              <View
                style={
                  styles.cartRight
                }
              >
                <View
                  style={
                    styles.quantityRow
                  }
                >
                  <TouchableOpacity
                    style={
                      styles.quantityButton
                    }
                    onPress={() =>
                      updateQuantity(
                        item.id,
                        -1
                      )
                    }
                  >
                    <Text>-</Text>
                  </TouchableOpacity>

                  <Text
                    style={
                      styles.quantityText
                    }
                  >
                    {item.quantity}
                  </Text>

                  <TouchableOpacity
                    style={
                      styles.quantityButton
                    }
                    onPress={() =>
                      updateQuantity(
                        item.id,
                        1
                      )
                    }
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>

                <Text
                  style={
                    styles.itemPrice
                  }
                >
                  RM{' '}
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </Text>

                <TouchableOpacity
                  style={
                    styles.removeButton
                  }
                  onPress={() =>
                    removeItem(
                      item.id
                    )
                  }
                >
                  <Text
                    style={
                      styles.removeText
                    }
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* Checkout is only displayed when the cart has items (ZAHRAN) */}
        {order.length > 0 && (
          <TouchableOpacity
            style={styles.button}
            onPress={openCheckout}
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Continue to Checkout
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setCurrentScreen(
              'menu'
            )
          }
        >
          <Text
            style={styles.buttonText}
          >
            Back to Menu
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  // This screen collect customer detail and show final order summary
  // Customer form and unique promotional-code feature (ZAHRAN)
  const renderCheckoutScreen =
    () => {
      return (
        <ScrollView
          contentContainerStyle={
            styles.screenContent
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Payment
          </Text>

          <Text
            style={styles.inputLabel}
          >
            Customer Name
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={customerName}
            onChangeText={
              setCustomerName
            }
            maxLength={40}
            autoCapitalize="words"
          />

          <Text
            style={styles.inputLabel}
          >
            Table Number
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter a table number"
            value={tableNumber}
            onChangeText={
              setTableNumber
            }
            keyboardType="number-pad"
            maxLength={2}
          />

          <Text
            style={styles.inputLabel}
          >
            Dining Option 🍽
          </Text>

          <View
            style={styles.optionRow}
          >
            <TouchableOpacity
              style={[
                styles.optionButton,
                diningOption ===
                  'Dine-in' &&
                  styles.selectedOptionButton,
              ]}
              onPress={() =>
                setDiningOption(
                  'Dine-in'
                )
              }
            >
              <Text
                style={[
                  styles.optionText,
                  diningOption ===
                    'Dine-in' &&
                    styles.selectedOptionText,
                ]}
              >
                Dine-in
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                diningOption ===
                  'Takeaway' &&
                  styles.selectedOptionButton,
              ]}
              onPress={() =>
                setDiningOption(
                  'Takeaway'
                )
              }
            >
              <Text
                style={[
                  styles.optionText,
                  diningOption ===
                    'Takeaway' &&
                    styles.selectedOptionText,
                ]}
              >
                Takeaway
              </Text>
            </TouchableOpacity>
          </View>

          {/* Promotional code unique feature (ZAHRAN) */}
          <Text
            style={styles.inputLabel}
          >
            Promotional Code 🎟
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter a 6-character promotional code"
            value={promoCode}
            onChangeText={
              handlePromoCodeChange
            }
            autoCapitalize="characters"
            maxLength={6}
          />

          <Text
            style={styles.helperText}
          >
            Promotional code is
            optional.
          </Text>

          <TouchableOpacity
            style={[
              styles.applyPromoButton,
              appliedPromoCode !==
                '' &&
                styles.appliedPromoButton,
            ]}
            onPress={applyPromoCode}
          >
            <Text
              style={[
                styles.applyPromoButtonText,
                appliedPromoCode !==
                  '' &&
                  styles.appliedPromoButtonText,
              ]}
            >
              {appliedPromoCode !==
              ''
                ? 'Promotion Applied'
                : 'Apply Code'}
            </Text>
          </TouchableOpacity>

          {appliedPromoCode !==
            '' && (
            <Text
              style={
                styles.promoSuccessText
              }
            >
              Code{' '}
              {appliedPromoCode}{' '}
              applied:{' '}
              {promoDiscountRate *
                100}
              % discount
            </Text>
          )}

          <Text
            style={styles.inputLabel}
          >
            Order Summary
          </Text>

          {/* Receipt-style Order Summary */}
          <View
            style={styles.receiptBox}
          >
            <Text
              style={
                styles.receiptHeader
              }
            >
              --- ORDER RECEIPT ---
            </Text>

            {/* Itemized list */}
            {order.map((item) => (
              <View
                key={item.id}
                style={
                  styles.receiptRow
                }
              >
                <Text
                  style={
                    styles.receiptItemName
                  }
                >
                  {item.name} x
                  {item.quantity}
                </Text>

                <Text
                  style={
                    styles.receiptItemPrice
                  }
                >
                  RM{' '}
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </Text>
              </View>
            ))}

            <View
              style={
                styles.receiptDivider
              }
            />

            <View
              style={
                styles.receiptRow
              }
            >
              <Text
                style={
                  styles.receiptLabel
                }
              >
                Total
              </Text>

              <Text
                style={
                  styles.receiptValue
                }
              >
                RM{' '}
                {subtotal.toFixed(2)}
              </Text>
            </View>

            <View
              style={
                styles.receiptRow
              }
            >
              <Text
                style={
                  styles.receiptLabel
                }
              >
                Discount applied (
                {(
                  promoDiscountRate *
                  100
                ).toFixed(0)}
                %)
              </Text>

              <Text
                style={
                  styles.receiptValue
                }
              >
                -RM{' '}
                {promotionalDiscount.toFixed(
                  2
                )}
              </Text>
            </View>

            <View
              style={
                styles.receiptDivider
              }
            />

            <View
              style={
                styles.receiptRow
              }
            >
              <Text
                style={
                  styles.receiptTotalLabel
                }
              >
                New total
              </Text>

              <Text
                style={
                  styles.receiptTotalValue
                }
              >
                RM{' '}
                {finalTotal.toFixed(
                  2
                )}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={confirmOrder}
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Place Order
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              setCurrentScreen(
                'cart'
              )
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Back to Cart
            </Text>
          </TouchableOpacity>
        </ScrollView>
      );
    };

  // This screen show final receipt after order successfully confirmed
  // Confirmation screen after successful validation (ZAHRAN)
  const renderConfirmationScreen =
    () => {
      return (
        <ScrollView
          contentContainerStyle={
            styles.screenContent
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            🎉Order Confirmed
          </Text>

          {/* Receipt-style Order Confirmation */}
          <View
            style={styles.receiptBox}
          >
            <Text
              style={
                styles.confirmationText
              }
            >
              Thank you,{' '}
              {customerName.trim()}!
            </Text>

            <Text
              style={
                styles.receiptDetailText
              }
            >
              Table number:{' '}
              {tableNumber} | Dining
              option: {diningOption}
            </Text>

            {appliedPromoCode !==
              '' && (
              <Text
                style={
                  styles.receiptDetailText
                }
              >
                Promo code:{' '}
                {appliedPromoCode}
              </Text>
            )}

            <View
              style={
                styles.receiptDivider
              }
            />

            <Text
              style={
                styles.receiptHeader
              }
            >
              --- RECEIPT BREAKDOWN
              ---
            </Text>

            {order.map((item) => (
              <View
                key={item.id}
                style={
                  styles.receiptRow
                }
              >
                <Text
                  style={
                    styles.receiptItemName
                  }
                >
                  {item.name} x
                  {item.quantity}
                </Text>

                <Text
                  style={
                    styles.receiptItemPrice
                  }
                >
                  RM{' '}
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </Text>
              </View>
            ))}

            <View
              style={
                styles.receiptDivider
              }
            />

            <View
              style={
                styles.receiptRow
              }
            >
              <Text
                style={
                  styles.receiptLabel
                }
              >
                Total
              </Text>

              <Text
                style={
                  styles.receiptValue
                }
              >
                RM{' '}
                {subtotal.toFixed(2)}
              </Text>
            </View>

            <View
              style={
                styles.receiptRow
              }
            >
              <Text
                style={
                  styles.receiptLabel
                }
              >
                Discount applied (
                {(
                  promoDiscountRate *
                  100
                ).toFixed(0)}
                %)
              </Text>

              <Text
                style={
                  styles.receiptValue
                }
              >
                -RM{' '}
                {promotionalDiscount.toFixed(
                  2
                )}
              </Text>
            </View>

            <View
              style={
                styles.receiptDivider
              }
            />

            <View
              style={
                styles.receiptRow
              }
            >
              <Text
                style={
                  styles.receiptTotalLabel
                }
              >
                New total
              </Text>

              <Text
                style={
                  styles.receiptTotalValue
                }
              >
                RM{' '}
                {finalTotal.toFixed(
                  2
                )}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={startNewOrder}
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Start New Order
            </Text>
          </TouchableOpacity>
        </ScrollView>
      );
    };

  // This function decide which screen need display based on currentScreen value
  const renderCurrentScreen = () => {
    if (
      currentScreen === 'welcome'
    ) {
      return renderWelcomeScreen();
    }

    if (
      currentScreen === 'menu'
    ) {
      return renderMenuScreen();
    }

    if (
      currentScreen === 'cart'
    ) {
      return renderCartScreen();
    }

    if (
      currentScreen ===
      'checkout'
    ) {
      return renderCheckoutScreen();
    }

    if (
      currentScreen ===
      'confirmation'
    ) {
      return renderConfirmationScreen();
    }

    return renderWelcomeScreen();
  };

  // Displays the screen selected by the currentScreen state
  return (
    <SafeAreaView
      style={styles.container}
    >
      {renderCurrentScreen()}
    </SafeAreaView>
  );
}

// All visual design and layout styles are stored inside here
const styles = StyleSheet.create({
  // StyleSheet keeps the visual settings organised and reusable
  // Style for logo text
  logo: {
    fontSize: 40,
  },

  // Style for café logo image
  logoImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
    tintColor: '#2B5B84',
  },

  // Style for every food and drink image
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },

  // Style for the short information shown on the welcome screen
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4A6B82',
    lineHeight: 25,
  },

  // Main background container for whole application
  container: {
    flex: 1,
    backgroundColor: '#F0F6FA',
  },

  // Keep welcome screen content in the centre
  centeredScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // Give spacing for scrollable screen contents
  screenContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // Main Pixel Café heading style
  mainTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E3A8A',
    marginTop: 10,
  },

  // Subtitle displayed below the main application title
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
    fontStyle: 'italic',
    color: '#3B82F6',
  },

  // Heading style used on menu, cart, checkout and confirmation screens
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'left',
    color: '#1E3A8A',
    marginTop: 20,
  },

  // Style for menu search input field (ZAHRAN)
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#93C5FD',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: '#1E293B',
    fontSize: 15,
  },

  // Style for empty search results container (ZAHRAN)
  noItemsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#93C5FD',
  },

  // Style for empty search results text (ZAHRAN)
  noItemsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64748B',
  },

  // Special dietary information styles (ZAHRAN)
  dietaryGuide: {
    backgroundColor: '#FFFFFF',
    borderColor: '#BFDBFE',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  dietaryGuideTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 5,
  },

  dietaryGuideText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
  },

  dietaryInfoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },

  dietaryBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 4,
    overflow: 'hidden',
  },

  vegetarianBadge: {
    color: '#047857',
    backgroundColor: '#D1FAE5',
  },

  veganBadge: {
    color: '#166534',
    backgroundColor: '#DCFCE7',
  },

  dairyFreeBadge: {
    color: '#0369A1',
    backgroundColor: '#E0F2FE',
  },

  allergenBadge: {
    color: '#B45309',
    backgroundColor: '#FEF3C7',
  },

  caffeineBadge: {
    color: '#6B21A8',
    backgroundColor: '#F3E8FF',
  },

  // Main card design used for menu items
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  // Allows the menu item information to use the available card space
  itemTextContainer: {
    flex: 1,
    paddingRight: 10,
  },

  // Style for food and drink names
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  // Style for secondary item details such as category and price information
  itemInformation: {
    marginTop: 3,
    color: '#64748B',
  },

  // Highlights the price of each selected or displayed item
  itemPrice: {
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2563EB',
  },

  // Main blue button design
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
  },

  // Smaller Add button used inside every menu card
  smallButton: {
    backgroundColor: '#3158E8',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },

  // Temporary green style shown after an item is added
  addedButton: {
    backgroundColor: '#10B981',
  },

  addedButtonText: {
    color: '#FFFFFF',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Card design used inside customer cart
  cartCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  // Left side of a cart row contains item information
  cartLeft: {
    flex: 1,
  },

  // Right side of a cart row contains quantity and removal controls
  cartRight: {
    alignItems: 'flex-end',
  },

  // Keeps minus button, quantity and plus button in one row
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityButton: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
    color: '#1E293B',
  },

  // Adds spacing above the item removal control
  removeButton: {
    marginTop: 8,
  },

  removeText: {
    color: '#EF4444',
    fontSize: 13,
  },

  // Message style used when no item exists in the cart
  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: '#64748B',
  },

  // Label style for checkout form fields
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 5,
    color: '#1E3A8A',
  },

  // Design for customer text input fields
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#93C5FD',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    color: '#1E293B',
  },

  // Keep dining option buttons in same row
  optionRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  // Default style for dine-in and takeaway selection buttons
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#93C5FD',
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginRight: 5,
  },

  optionText: {
    color: '#334155',
    fontSize: 15,
  },

  // Changes the selected dining option button to blue
  selectedOptionButton: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  // Design for promotional code button
  applyPromoButton: {
    backgroundColor: '#DBEAFE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 5,
  },

  applyPromoButtonText: {
    color: '#1E3A8A',
    fontSize: 15,
    fontWeight: 'bold',
  },

  appliedPromoButton: {
    backgroundColor: '#10B981',
  },

  appliedPromoButtonText: {
    color: '#FFFFFF',
  },

  // Confirmation message displayed after a valid code is applied
  promoSuccessText: {
    color: '#047857',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 5,
  },

  // Receipt box design for checkout and confirmation
  receiptBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#93C5FD',
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
    marginTop: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  receiptHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 12,
    letterSpacing: 1,
  },

  // Places receipt descriptions and prices on opposite sides
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },

  receiptItemName: {
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '500',
  },

  receiptItemPrice: {
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '600',
  },

  // Thin separator used between receipt sections
  receiptDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 10,
    borderStyle: 'dashed',
  },

  receiptLabel: {
    fontSize: 14,
    color: '#475569',
  },

  receiptValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
  },

  // Style for the final total label
  receiptTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },

  // Style for the final payable amount
  receiptTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  receiptDetailText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
  },

  helperText: {
    fontSize: 13,
    marginBottom: 8,
    color: '#64748B',
  },

  // Thank you message style on the final confirmation screen
  confirmationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1E3A8A',
  },
});