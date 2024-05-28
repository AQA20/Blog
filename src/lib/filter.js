const filter = (orderBy, order, params) => {
  params.set('orderBy', orderBy);
  params.set('order', order);
  return params.toString();
};

export default filter;
