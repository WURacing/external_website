[![Laravel Forge Site Deployment Status](https://img.shields.io/endpoint?url=https%3A%2F%2Fforge.laravel.com%2Fsite-badges%2F6f61dc2d-e7e9-4460-9348-8e42b4749ae7%3Fdate%3D1&style=for-the-badge)](https://forge.laravel.com/servers/754694/sites/2230963)

# Need help...
Changing the countdown? Go to src/views/HomeView.vue, change the countdownDate const on line 180

Making the site load faster? Compress the team images. By a lot. They should be no larger than 2MB. (Yes there are probably other things we could do too but ¯\_(ツ)_/¯)

Adding sponsors? Do so in washuracing.com/admin

Outdated sponsorship packet?<br/>
1. Rename most current sponsorship packet to "sponsorship_packet20XX.pdf"
2. Drag it into the assets folder
3. Rename line 88 in src/views/SponsorsView.vue to the new sponsorship packet

Pushing your changes to production when you're done? Visit forge.laravel.com, login to the WashU Racing account, Sites -> washuracing.com -> Overview -> Deploy

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
