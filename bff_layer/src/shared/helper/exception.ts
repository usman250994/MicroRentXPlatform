export function rentalException(message) {
  this.message = message;
  this.name = 'custom rental error';
}
