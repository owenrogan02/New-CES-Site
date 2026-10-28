export type Industry = {
  slug: string;
  name: string;
  heading: string;
  title: string;
  photo: string;
  banner: string;
  body: string;
  modulesTitle: string;
  modules: string[];
};

export const modules = [
  { name: 'Accounts', icon: 'accounts.png' },
  { name: 'Bookings', icon: 'bookings.png' },
  { name: 'Caller ID', icon: 'callerid.png' },
  { name: 'Cash Rounding', icon: 'cashrounding.png' },
  { name: 'Chip & PIN Payments', icon: 'chippin.png' },
  { name: 'Customer Loyalty', icon: 'loyalty.png' },
  { name: 'Hotel Links', icon: 'hotellinks.png' },
  { name: 'Mobile ETop-Up', icon: 'topup.png' },
  { name: 'Multisite', icon: 'multisite.png' },
  { name: 'Newsround', icon: 'newsround.png' },
  { name: 'Scale Links', icon: 'scalelink.png' },
  { name: 'Screen Designer', icon: 'screendes.png' },
  { name: 'Stock Control', icon: 'stockcontrol.png' },
  { name: 'Table Planner', icon: 'tableplanner.png' },
  { name: 'Wholesale Links', icon: 'wholesale.png' },
  { name: 'Xero Link', icon: 'xero_module.png' },
] as const;

export const moduleIcon = (name: string) => modules.find((m) => m.name === name)?.icon ?? 'accounts.png';

export const partners = [
  ['3R Payment Solutions', '3rpaymentsolutions_logo_150.png'],
  ['Amadeus', 'amadeus_logo_150.png'],
  ['Best-one', 'bestone_logo_150.png'],
  ['Booker Wholesale', 'booker_logo_150.png'],
  ['Budgens', 'budgens_logo_150.png'],
  ['Guestline Reslynx', 'guestline_logo_150.png'],
  ['Guestmaster', 'guestmaster_logo_150.png'],
  ['High Level', 'highlevel_logo_150.png'],
  ['Ingenico', 'ingenico_logo_150.png'],
  ['Londis', 'londis_logo_150.png'],
  ['Mainstay', 'mainstay_logo_150.png'],
  ['Payment Sense', 'paymentsense_logo_150.png'],
  ['Res Diary', 'resdiary_logo_150.png'],
  ['Resident Pro', 'residentpro_logo_150.png'],
  ['Sage', 'sage_logo_150.png'],
  ['Skoop!', 'skoop_logo_150.png'],
  ['Wavesoft', 'wavesoft_logo_150.png'],
  ['Welcome Group Inc.', 'welcome_logo_150.png'],
  ['Xero', 'xero_logo_partner_150.png'],
  ['Yoyo Wallet', 'yoyowallet_logo_150.png'],
].map(([name, file]) => ({ name, file }));

/** "Some of Our Satisfied End User Clients" (home page). */
export const clients = [
  { name: 'The Bank', file: 'bank.png', href: 'http://www.thebankwrexham.com/' },
  { name: 'Cardiff Blues', file: 'cardiffblues.png', href: 'http://www.cardiffblues.com/' },
  { name: 'Chessington CC', file: 'chessingtoncc.png', href: 'http://www.chessingtoncricketclub.co.uk/' },
  { name: 'Doctor Who Experience', file: 'doctorwho.png', href: 'http://www.doctorwho.tv/events/doctor-who-experience/' },
  { name: 'Holiday Inn Leeds - Bradford', file: 'Holiday_Inn_LB.png', href: 'https://www.ihg.com/holidayinn/hotels/gb/en/bradford/leetl/hoteldetail?cm_mmc=GoogleMaps-_-HI-_-GB-_-LEETL' },
  { name: 'Glasgow University', file: 'glasgowuni.png', href: 'http://www.gla.ac.uk/' },
  { name: 'Jazz Cafe', file: 'jazzcafe.png', href: 'http://www.thejazzcafe.co.uk/' },
  { name: 'Jin Kichi', file: 'jinkichi.png', href: 'http://www.jinkichi.com/' },
  { name: 'JSM Company Group', file: 'jsm_company_group.png', href: 'https://jsmcogroup.uk/leisure/' },
  { name: 'The Mint Room', file: 'mintroom.png', href: 'http://www.themintroom.co.uk/' },
  { name: 'Renoir Cafe', file: 'renoir.png', href: 'http://www.cafe-renoir.co.uk/' },
  { name: 'West Street Vineyard', file: 'weststreetvineyard.png', href: 'http://www.weststreetvineyard.co.uk/' },
  { name: 'Wrapchic', file: 'wrapchic.png', href: 'http://www.wrapchic.co.uk/' },
];

export const cloverClients = [
  ['Chelsea F.C.', 'chelsea.png'],
  ['Henson Leisure Group', 'henson.png'],
  ['Hibernian F.C.', 'hibernian.png'],
  ['Leeds United F.C.', 'lufc.png'],
  ['Magic Monkey Restaurant', 'magic-monkey.png'],
  ['Newby', 'newby.png'],
  ['Revo Kitchen & Terrace', 'revo.png'],
  ['Shuffle Club', 'shuffle_club.png'],
  ['SIG UK', 'sig.png'],
  ['Twycross Zoo', 'twycross_zoo.png'],
  ['Vision Redbridge Culture & Leisure', 'vision.png'],
  ['YMCA', 'ymca.png'],
].map(([name, file]) => ({ name, file: `clover-client-logos/${file}` }));

export const touchFeatures = [
  { key: 'integration', title: '3rd Party Integration', icon: '3rdpartylinks.png', body: "We offer a variety of links to industry standard applications that help emphasise the 'all-in-one' system. This includes hotel links, loyalty schemes, chip & PIN integration and much more." },
  { key: 'bookings', title: 'Bookings & Reservations', icon: 'bookings.png', body: 'If you require customers to make bookings or reservations, CES Touch allows you to easily enter client details and apply functions such as split bills and charge sheets within table planner.' },
  { key: 'analytics', title: 'Business Analytics', icon: 'businessanalytics.png', body: 'With cloud based intelligence you can make inventory changes, see business performance by running a variety of reports, and monitor employee activity from anywhere in the world, at any time.' },
  { key: 'customisation', title: 'Ultimate Customisation', icon: 'customisation.png', body: 'Alongside unique on-screen customisation, CES Touch also has the capability for different modules to be used to create your own custom software; tailored for your business.' },
  { key: 'versatility', title: 'Versatility', icon: 'versatility.png', body: 'As we are not tied to specific hardware, we can boast plug and play for a wide range of peripherals that work well with almost any brand of hardware that you prefer.' },
  { key: 'support', title: 'Support', icon: 'support.png', body: 'Constant feedback from our passionate customers is greatly appreciated and is always taken on board. Please feel free to call or email us anytime and we will be happy to assist.' },
] as const;

export const industries: Industry[] = [
  {
    slug: 'cafes-delis', name: 'Cafés & Delis', heading: 'Café & Deli Point of Sale Software',
    title: 'Café & Deli PoS Software | Table Service Solutions | CES Software',
    photo: 'cafe.jpg', banner: 'cafe-banner.jpg', modulesTitle: 'Modules hand picked for Cafés & Delis',
    modules: ['Caller ID', 'Chip & PIN Payments', 'Customer Loyalty', 'Multisite', 'Scale Links', 'Screen Designer', 'Stock Control'],
    body: 'CES Touch seamlessly allows your customers to dine in or to purchase takeout food. The system works accordingly with the service that they require. Touch allows for simple to use table service with our tablet integration. Kitchen printers are easy to set up and install. This allows for enhanced kitchen efficiencies, increased order accuracy, and helps to keep errors to a minimum and customer satisfaction high. All orders that are processed go through the software which improves inventory management and notifies you when stock is running low. Touch also allows you to set up recipes to help improve stock control of ingredients to give you in depth knowledge of what stock has been sold and where profit is being made. Phone orders can be made and can be stored to a charge sheet until the customer comes to collect their items. This enables you to easily keep track of customers and helps organise your business. You can maximise profits with the software’s fast accurate reports on a daily, weekly, or monthly basis. These reports can link directly into our enterprise cloud reporting software to allow for a wider range of detailed reports to help keep you on top of your business.',
  },
  {
    slug: 'convenience', name: 'Convenience Stores', heading: 'Small Retail Business Point of Sale Software',
    title: 'Point of Sale Software for Retail | Small Business Solutions | CES Software',
    photo: 'convenience.jpg', banner: 'convenience-banner.jpg', modulesTitle: 'Modules hand picked for Convenience',
    modules: ['Accounts', 'Chip & PIN Payments', 'Mobile ETop-Up', 'Newsround', 'Scale Links', 'Screen Designer', 'Stock Control', 'Wholesale Links'],
    body: 'CES Touch has been developed to help the convenience sector for over 10 years, offering point of sale solutions for small retail businesses. This has provided Touch the capabilities to allow plug and play peripherals with multi links to scanners and scales, including a combined scanner with integrated scale as found in supermarkets. The software can also produce product labels straight from the printer that can be displayed on the shop shelves. Touch’s simple and intuitive interface helps to rapidly process customer transactions and helps to improve customer satisfaction. There are links to hand held terminals that deal with stock control for quick stock takes to help save time. You can maximise profits with the software’s fast accurate reports on a daily, weekly, or monthly basis. These reports can link directly into our enterprise cloud reporting software to allow for a wider range of detailed reports to help keep you on top of your retail business.',
  },
  {
    slug: 'fastfood-takeaways', name: 'Fast Food & Takeaways', heading: 'Point of Sale Software for Takeaways & Fast Food Restaurants',
    title: 'EPoS Software for Takeaways | Fast Food Point of Sale | CES Software',
    photo: 'fastfood.jpg', banner: 'fastfood-banner.jpg', modulesTitle: 'Modules hand picked for Fast Food & Takeaways',
    modules: ['Accounts', 'Bookings', 'Caller ID', 'Chip & PIN Payments', 'Customer Loyalty', 'Multisite', 'Screen Designer', 'Stock Control'],
    body: 'CES Touch deals with various scenarios with ease as eat in and takeout VAT is calculated automatically. Touch can flawlessly communicate with kitchen printers, enhancing kitchen efficiencies and order accuracy. This helps to keep errors to a minimum and customer satisfaction high. All orders that are processed go through the software, improving inventory management and notifying you when stock is running low. Our EPoS Software for takeaways also allows you to set up recipes to help improve stock control of ingredients to give you in depth knowledge of what stock has been sold and where profit is being made. Caller ID makes phone orders much simpler as they can be linked to customer accounts and can be easily stored to a charge sheet until the customer comes to collect their items. This helps you to easily keep track of customers and helps organise your business. You can maximise profits with the software’s fast accurate reports on a daily, weekly, or monthly basis. These reports can link directly into our enterprise cloud reporting software to allow for a wider range of detailed reports to help keep you on top of your business.',
  },
  {
    slug: 'hotels', name: 'Hotels', heading: 'Hospitality Point of Sale Software',
    title: 'Hospitality Point of Sale Software | Hotel PoS Solutions | CES Software',
    photo: 'hotel.jpg', banner: 'hotel-banner.jpg', modulesTitle: 'Modules hand picked for Hotels',
    modules: ['Accounts', 'Bookings', 'Caller ID', 'Chip & PIN Payments', 'Customer Loyalty', 'Hotel Links', 'Mobile ETop-Up', 'Multisite', 'Screen Designer', 'Stock Control', 'Table Planner'],
    body: 'CES Touch can operate on its own merits without the need to link to an external Property Management System (PMS). However, larger establishments may require a more intense PMS and we currently link to Guestline Rezlynx, Guestmaster, High Level, Welcome, and Resident Pro. You have the ability to post charges to rooms and also split bills by the number of guests, enabling you to keep on top of your hospitality business. You can maximise profits with the software’s fast accurate reports on a daily, weekly, or monthly basis. These reports can link directly into our enterprise cloud reporting software to allow for a wider range of detailed reports to help keep you on top of your business.',
  },
  {
    slug: 'newsagents', name: 'Newsagents', heading: 'Newsagency EPoS Software',
    title: 'Newsagents Point of Sale Software | Newsagency EPoS Solutions | CES Software',
    photo: 'newsagent.jpg', banner: 'newsagents-banner.jpg', modulesTitle: 'Modules hand picked for Newsagents',
    modules: ['Accounts', 'Chip & PIN Payments', 'Mobile ETop-Up', 'Newsround', 'Scale Links', 'Screen Designer', 'Stock Control', 'Wholesale Links'],
    body: 'CES Touch has developed the Home News Delivery (HND) module to become a detailed publication delivery system, giving the retailer complete control of customer accounts and scheduled deliveries. The gives you the ability to organise routes for the delivery person with personalised messages for each address. The system also caters for advanced publication vouchers, calculating delivery charges so anyone can collect the correct payment from the customer without the complications of working out what is owed. The module also takes in to account shop holidays and public holidays if the shop is closed for a period of time. The system also allows for one off deliveries and customer holidays. You can maximise profits with the software’s Newsround dashboard that will allow you to create accurate reports on a daily, weekly, or monthly basis. These reports can link directly into our enterprise cloud reporting software to allow for a wider range of detailed reports to help keep you on top of your business.',
  },
  {
    slug: 'pubs-bars-clubs', name: 'Pubs, Bars & Clubs', heading: 'EPoS Software for Pubs, Bars & Clubs',
    title: 'Bar Point of Sale Software | Best EPoS Systems for Pubs, Clubs | CES Software',
    photo: 'pub.jpg', banner: 'pubs-banner.jpg', modulesTitle: 'Modules hand picked for Pubs, Bars, & Clubs',
    modules: ['Bookings', 'Chip & PIN Payments', 'Customer Loyalty', 'Multisite', 'Screen Designer', 'Stock Control', 'Table Planner'],
    body: 'CES Touch can be easily configured for the pub, bar or club industry as the software features Dallas key integration for your operators. As quick service is a must, fast multi-screen systems automatically allow you to keep transactions up to date and enable you to store the transactions to charge sheets. With unlimited pricing levels for different products to allow for loyalty schemes etc. you can easily keep track of stock. Kitchen printers are easy to set up and install. This allows for enhanced kitchen efficiencies, increased order accuracy, and helps to keep errors to a minimum and customer satisfaction high. You can maximise profits with the software’s fast accurate reports on a daily, weekly, or monthly basis. These reports can link directly into our enterprise cloud reporting software to allow for a wider range of detailed reports to help keep you on top of your business.',
  },
  {
    slug: 'restaurants', name: 'Restaurants', heading: 'Restaurant EPoS Software',
    title: 'Restaurant EPoS Software | Management Point of Sale Systems | CES Software',
    photo: 'restaurant.jpg', banner: 'restaurant-banner.jpg', modulesTitle: 'Modules hand picked for Restaurants',
    modules: ['Bookings', 'Chip & PIN Payments', 'Customer Loyalty', 'Multisite', 'Scale Links', 'Screen Designer', 'Stock Control', 'Table Planner'],
    body: 'With CES Touch you can effortlessly provide service at the table side with our integrated tablets. These work in conjunction with the master till to keep all transactions concurrent and synced so that accurate reports can be produced. Tablets can also work in offline mode so that in any scenario you can keep processing transactions, once the tablet comes back online the transactions will be synced with the main till. Touch has been designed so that it can flawlessly communicate with multiple kitchen printers. This enhances kitchen efficiencies, order accuracy, and helps to keep errors to a minimum while keeping customer satisfaction high. All orders that are processed go through the software which improves inventory management and notifies you when stock is running low. With the addition of table planner, you can set up your restaurant floor plan to visualise your restaurant and open and edit customer charge sheets quickly. There are also many 3rd party links to apps for online bookings, or you could use our on-site booking system to keep your customers satisfied. You can maximise profits with the software’s fast accurate reports on a daily, weekly, or monthly basis. These reports can link directly into our enterprise cloud reporting software to allow for a wider range of detailed reports to help keep you on top of your business.',
  },
  {
    slug: 'wholesale', name: 'Wholesale', heading: 'Wholesale Point of Sale Software',
    title: 'Wholesale PoS Software | Warehouse Management Solutions | CES Software',
    photo: 'wholesale.jpg', banner: 'wholesale-banner.jpg', modulesTitle: 'Modules hand picked for Wholesale',
    modules: ['Accounts', 'Chip & PIN Payments', 'Multisite', 'Scale Links', 'Screen Designer', 'Stock Control'],
    body: 'CES Touch can be easily integrated into the wholesale industry as the software can be adapted to your sector with ease. With on screen changes such as centralising the sale screen for longer descriptions, to back end changes such as exclusion of VAT. The system allows the option of A4 receipts and invoices that can be printed accounts. Different pricing levels can be set up if needed with the option of credit limits, enabling you to take full advantage of your business potential. You can maximise profits with the software’s fast accurate reports on a daily, weekly, or monthly basis. These reports can link directly into our enterprise cloud reporting software to allow for a wider range of detailed reports to help keep you on top of your business.',
  },
];
