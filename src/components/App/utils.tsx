import { SCREEN, TABLET } from '../../config/config'

export const updateTotalCount = (setCardsTotalCount: (e: number) => void) => {
  return function () {
    if (window.innerWidth >= SCREEN) {
      setCardsTotalCount(12);
    }
    else if (window.innerWidth >= TABLET) {
      setCardsTotalCount(8);
    }
    else {
      setCardsTotalCount(5);
    }
  }
}