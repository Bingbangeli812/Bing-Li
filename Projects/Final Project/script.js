document.addEventListener('DOMContentLoaded', () => {
  const dishes = document.querySelectorAll('.dish');
  const meatFilters = document.querySelectorAll('.ingredient-placeholder[data-meat]');
  const vegetableFilters = document.querySelectorAll('.ingredient-placeholder[data-vegetable]');
  const timeFilters = document.querySelectorAll('.time-item[data-time]');

  let selectedMeat = null;
  let selectedVegetables = [];
  let selectedTime = null;

  // 筛选函数
  function filterDishes() {
    dishes.forEach(dish => {
      const dishMeat = dish.getAttribute('data-meat');
      const dishVegetables = dish.getAttribute('data-vegetables').split(',').map(v => v.trim());
      const dishTime = dish.getAttribute('data-time');

      const meatMatch = !selectedMeat || dishMeat.includes(selectedMeat);
      const vegetablesMatch = selectedVegetables.length === 0 || selectedVegetables.every(veg => dishVegetables.includes(veg));
      const timeMatch = !selectedTime || dishTime === selectedTime;

      if (meatMatch && vegetablesMatch && timeMatch) {
        dish.style.display = 'block';
      } else {
        dish.style.display = 'none';
      }
    });
  }

  // 绑定肉类筛选事件
  meatFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      const meat = filter.getAttribute('data-meat');
      selectedMeat = selectedMeat === meat ? null : meat;

      meatFilters.forEach(f => f.classList.remove('selected'));
      if (selectedMeat) filter.classList.add('selected');

      filterDishes();
    });
  });

  // 绑定蔬菜筛选事件
  vegetableFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      const vegetable = filter.getAttribute('data-vegetable');
      if (selectedVegetables.includes(vegetable)) {
        selectedVegetables = selectedVegetables.filter(v => v !== vegetable);
        filter.classList.remove('selected');
      } else {
        selectedVegetables.push(vegetable);
        filter.classList.add('selected');
      }

      filterDishes();
    });
  });

  // 绑定时间筛选事件
  timeFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      const time = filter.getAttribute('data-time');
      selectedTime = selectedTime === time ? null : time;

      timeFilters.forEach(f => f.classList.remove('selected'));
      if (selectedTime) filter.classList.add('selected');

      filterDishes();
    });
  });
});

function filterDishes() {
  dishes.forEach(dish => {
    const dishMeat = dish.getAttribute('data-meat');
    const dishVegetables = dish.getAttribute('data-vegetables').split(',').map(v => v.trim());
    const dishTime = dish.getAttribute('data-time');

    const meatMatch = !selectedMeat || dishMeat.includes(selectedMeat);
    const vegetablesMatch = selectedVegetables.length === 0 || selectedVegetables.every(veg => dishVegetables.includes(veg));
    const timeMatch = !selectedTime || dishTime === selectedTime;

    if (meatMatch && vegetablesMatch && timeMatch) {
      dish.style.display = 'block';
    } else {
      dish.style.display = 'none';
    }
  });
}