import TrackedLink from './components/tracked-link';

export default {
  components: [],
  link: TrackedLink,
  onDeclineCookies: () => {
    window.gaOptout();
  },
};
