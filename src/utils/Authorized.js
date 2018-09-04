import RenderAuthorized from '../components/Authorized';
import { getAuthorityLevel } from './authority';

let Authorized = RenderAuthorized(getAuthorityLevel()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthorityLevel());
};

export { reloadAuthorized };
export default Authorized;
