export const changeStock = (event, id) => {
event.preventDefault();
router.push({ path: `/stock/edit/${id}` });
};
