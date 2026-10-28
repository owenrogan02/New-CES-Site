export const site = {
  name: 'CES Software',
  legalName: 'CES Software Ltd',
  tagline: 'Market Leaders in Business EPoS Software',
  phone: '01992 564 645',
  phoneHref: 'tel:+441992564645',
  salesEmail: 'sales@cessoftware.com',
  supportEmail: 'support@cessoftware.com',
  address: ['CES Software Ltd', '39 Lindsey Street', 'Epping', 'Essex', 'CM16 6RB'],
  owner: { name: '3R Telecom Limited', href: 'http://www.3rtelecom.co.uk/' },
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/15082166' },
    { label: 'X / Twitter', href: 'https://twitter.com/CESSoftware?lang=en-gb' },
    { label: 'Facebook', href: 'https://www.facebook.com/CESSoftware/' },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UC01TylQXv6iXzcl7HgF94fA' },
  ],
  forum: 'https://forum.cessoftware.co.uk',
} as const;

/** Copy for the dealer-login placeholder (plan section 6). Nothing here is ever submitted anywhere. */
export const dealerLogin = {
  badge: 'Concept preview',
  title: 'Dealer Portal',
  subtitle: 'Sign in to your dealer account',
  panelTitle: 'CES Software’s main route to market is through its dealers.',
  panelBody:
    'The dealer section provides access to software information, the support helpdesk and other useful links.',
  toast: 'This is a design preview. Dealer sign-in isn’t connected in this concept.',
  becomeDealer: 'Not a dealer yet? Become a dealer',
} as const;

export const nav = {
  products: [
    { label: 'CES Touch', blurb: 'Bespoke all-in-one EPoS software', href: 'touch', icon: 'touch' },
    { label: 'CES Ordering', blurb: 'OrderSoft handheld & QR ordering', href: 'ordering', icon: 'ordering' },
    { label: 'CES Rewards', blurb: 'Loyalty, vouchers & gift cards', href: 'rewards', icon: 'rewards' },
    { label: 'CES Intelligence', blurb: 'Cloud reporting & multi-site control', href: 'intelligence', icon: 'intelligence' },
    { label: 'CES Edge', blurb: 'Free POS for Clover devices', href: 'edge', icon: 'edge' },
    { label: 'Xero Link', blurb: 'Daily sales posted to Xero', href: 'touch/xero', icon: 'xero' },
  ],
  company: [
    { label: 'The Company', href: 'about' },
    { label: 'Contact Us', href: 'contact' },
    { label: 'News & Updates', href: 'news' },
  ],
} as const;
