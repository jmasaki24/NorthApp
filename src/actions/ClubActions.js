// probably could do without redux for this... oh well...
import { OPEN_CLUB } from './types';

export const openClub = (item) => ({
    type: OPEN_CLUB,
    payload: item,
});
