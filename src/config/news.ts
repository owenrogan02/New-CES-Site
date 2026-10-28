export type NewsItem = {
  id: string;
  title: string;
  paras?: string[];
  bullets?: string[];
  bullets2?: string[];
  images?: string[];
  after?: { paras?: string[]; bullets?: string[]; images?: string[] }[];
};

export const newsIntro =
  'Following the great success of Touch Versions 9 and 10 we continue to move the product forward with Version 11. We have added several great new features and requests from dealers and end users.';

export const news: NewsItem[] = [
  {
    id: 'ordersoft',
    title: 'OrderSoft',
    paras: [
      'Introducing our in-house developed Android-based order at table solution, with seamless integration with Dojo TaP. This takes our order at table offering to a new level enabling a single terminal to be used for taking orders, printing bills and taking payments. Also available for iOS without integrated payments as a recommended upgrade for customers currently using Wavesoft.',
      'Our intuitive interface has been designed to work alongside Touch and can display the departments in button or list mode. We have added features such as menus and open price items with pop up screens for menus and condiments to work in a very similar way as Touch.',
      "Keep customers on restaurant floor and boost sales with our queue busting feature. Don't miss out on extra orders due to slow service. Elevate your business with our innovative devices, delivering an exceptional customer experience.",
    ],
    images: Array.from({ length: 12 }, (_, i) => `order-soft-${i + 1}.jpg`),
  },
  {
    id: 'tmc',
    title: 'Touch Management Control!',
    paras: [
      'TMC (Touch Management Control) has been embedded in Touch version 11, revolutionizing business management. Accessible in sales mode or the back office, TMC is now included in our SaaS model. Experience the updated version with a fresh look, improved functionality, and new charge sheet compatibility. Gain real-time insights into sales, voids, turnover, and tables from any terminal. Run End of Day procedures seamlessly. Take control of your business and optimize operations. Upgrade to Touch version 11 with TMC for a new level of control and efficiency. Transform the way you manage your business today.',
    ],
  },
  {
    id: 'colour',
    title: 'New Colour Scheme',
    paras: ['Button and border colours changed to dark blue with light blue text to give a new look and feel for version 11.'],
    images: ['colour-scheme-1.png', 'colour-scheme-2.png'],
  },
  {
    id: 'mix-match',
    title: 'Mix and Match Upgrade!',
    paras: ['Mix and Match is an area we have added some great improvements. Below is the new look mix and match setup screen.'],
    bullets: [
      'Buttons added to the top to show each offer type individually in the new grid',
      'Button to show archived offers and option to restore archived offers',
      'New colour filtering to highlight expired and on stop offers in the grid',
      'Search by product description added to the search filter',
      'New grid allows sorting by clicking on the fields (E.G sort by end date)',
    ],
    images: ['mix-match-1.png'],
  },
  {
    id: 'mix-match-settings',
    title: 'New Mix and Match Offer Settings',
    bullets: [
      '**Price Level** Price Level setting added for Fixed Price Offers, used to set the price level that has to be used to trigger the offer. Example: 2 Pints for £8 on PL1 will not trigger if half pints are sold on PL2.',
      '**Do Not Archive** setting added, will not archive the offer if ticked',
      '**Trigger After Quantity** setting added on Percentage Off offers and will keep applying to percentage off to any items in the offer once the trigger quantity has been reached.',
    ],
    images: ['mix-match-2.png', 'mix-match-3.png'],
  },
  {
    id: 'mix-match-sales',
    title: 'Mix and Match Sales Mode Updates',
    bullets: [
      'Fixed Price and Amount Off offers will now apportion the Mix and Match discount to all the items in the offer. The Example below is for a Fixed Price **3 Cokes for £3** offer where the discount amount is applied equally on the 3 products.',
      "Mix and Match updated for 'Happy Hour' type offers to apply and retain the offer prices to items added during offer start and end times when used with charge sheets. The example below shows the same items stored to a charge sheet where only the first two items were added during the offer times.",
    ],
    images: ['mix-match-4.png', 'mix-match-5.png'],
  },
  {
    id: 'price-shifts',
    title: 'Price Shifts',
    paras: ['Price Shifts have a new trigger quantity setting (default is 1) to set the number of items required to apply the price shift prices. This enables price shifts to work like mix and match with the option of using price levels.'],
    images: ['mix-match-6.png'],
  },
  {
    id: 'discount-mm',
    title: 'Discount Mix and Match',
    paras: ["New Back-Office setting added ‘Allow additional discount with Mix and Match’. If enabled, discount can be applied to Mix and Match offers E.G additional 20% staff discount can be applied to the Mix and Match price."],
  },
  {
    id: 'vouchers',
    title: 'Vouchers',
    paras: ['Voucher system updated to be able to issue a new voucher or give change if the whole voucher amount is not used, touch.ini setting needed VOUCHERPLU=XXXXXXX.'],
    images: ['vouchers-1.png'],
  },
  {
    id: 'product-enquiry',
    title: 'Product Enquiry Long',
    paras: ['New button command **PRODUCT ENQUIRY LONG** based on the **PRODUCT ENQUIRY** command but uses the long product description.'],
    images: ['product-enquiry-long-1.png'],
  },
  {
    id: 'reprint',
    title: 'Reprint Receipts',
    paras: ['New button command **PRINT RECEIPTS** which are a simplified version of the Review screen with the order reversed so the latest transaction is at the top. The idea of this screen is to make it quicker and easier to print receipts for the most recent transactions.'],
    images: ['receipts-1.png'],
  },
  {
    id: 'quantity',
    title: 'Quantity Change',
    paras: ['New button command **QUANTITY CHANGE** that opens the screen below displaying the current items in the sales grid. This function makes it quick and easy to change the quantity on any item by highlighting the item and using the + and – buttons to change the quantity.'],
    images: ['quantity-change-1.png'],
  },
  {
    id: 'last-transaction',
    title: 'Show Last Transaction Details',
    paras: ["New option to show the last transaction details at the top of the sales grid, this option requires a touch.ini setting **SHOWLASTTRANSACTIONDETAILS=YES**. When enabled it will bypass the ‘Press Here to Continue’ button on the tender screen and go straight back to the sales screen at the end of each transaction displaying the last transaction details at the top of the sales grid. The last sale banner will close automatically when an item is scanned or added to the sales grid."],
    images: ['last-transaction-details-1.png'],
  },
  {
    id: 'sales-viewer',
    title: 'Sales Viewer',
    paras: ['Sales viewer has been updated to display condiments that will display in red as below.'],
    images: ['sales-viewer-1.png'],
  },
  {
    id: 'sign-off',
    title: 'Sign Off After Printing Requested Bills',
    paras: ["The system setting to ‘Sign off after printing requested Bills‘ now works when printing bills from inside the various charge sheet screens, Table Planner, *CHARGE and *CHARGE/V. On previous versions this option only worked when using the RECEIPT button in sales mode once a charge sheet has been opened"],
  },
  {
    id: 'reduced-labels',
    title: 'Reduced Price Label Printing',
    paras: [
      'New button command **REDUCED*REDUCEDPRICELABEL** used for reducing prices on the fly for products reaching their sell by date. This function opens the screen below where you can scan or search for the products to be reduced and enter the reduced price on a pop up number pad and enter the number of labels required. This function creates an alt PLU using PL20.',
    ],
    images: ['reduced-price-label-printing-1.png'],
    after: [{ paras: ['Sample label designed for a Bixolon label printer, label size 58mm x 38mm:'], images: ['sample-label-1.png'] }],
  },
  {
    id: 'stock-transfer',
    title: 'Stock Location Transfer',
    paras: [
      'The Stock Location Transfer function has been updated on version 11 and can now be run from sales mode as well as back office and has a new A4 report. The updated version writes to a new data table and populates an individual transfer number for each transfer and records the cost prices.',
    ],
    images: ['stock-location-transfer-1.png'],
    after: [{ paras: ['The report filter enables selecting transfers between specific locations.'], images: ['stock-location-transfer-2.png', 'stock-location-transfer-3.png'] }],
  },
];
