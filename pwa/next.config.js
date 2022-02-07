module.exports = {
  serverRuntimeConfig: {
    NEXT_PUBLIC_ENTRYPOINT: process.env.NEXT_PUBLIC_ENTRYPOINT || "https://localhost",
  },
  swcMinify: true,
  images: {
    domains: ['stage.whgstage.com'],
  },	
  env: {
    game_image_url: 'https://stage.whgstage.com/scontent/images/games/',
    enable_block_game_brands: true,
    enable_block_game_country: true	  
  },
  i18n: {
    locales: ['en', 'fr', 'nl', 'no', 'pt', 'de', 'sv', 'fi', 'es'],
    defaultLocale: 'en',
    localeDetection: true,	  
  },	
};
