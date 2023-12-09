class NumberUtils {
  formatAmount(amount: number): string {
    const formatter = new Intl.NumberFormat();

    if (Math.abs(amount) >= 1e6) {
      return formatter.format(Math.floor(amount / 1e6)) + "M";
    } else if (Math.abs(amount) >= 1e3) {
      return formatter.format(Math.floor(amount / 1e3)) + "k";
    } else {
      return formatter.format(amount);
    }
  }
}

const numberUtils = new NumberUtils();
export default numberUtils;
