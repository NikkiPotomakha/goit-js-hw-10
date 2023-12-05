import Notiflix from 'notiflix';
document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = new SlimSelect({
    select: '#breed-select',
    placeholder: 'Оберіть породу',
  });

  const loader = document.getElementById('loader');
  const error = document.getElementById('error');
  const catInfo = document.getElementById('cat-info');

  try {
    // Завантаження порід
    const breeds = await fetchBreeds();
    const breedOptions = breeds.map(breed => ({
      value: breed.id,
      text: breed.name,
    }));
    breedSelect.setData(breedOptions);

    // Вибір породи
    breedSelect.on('change', async () => {
      const selectedBreedId = breedSelect.selected();
      loader.style.display = 'block';
      error.style.display = 'none';
      catInfo.innerHTML = '';

      try {
        // Отримання інформації про кота за породою
        const catData = await fetchCatByBreed(selectedBreedId);
        const catImage = document.createElement('img');
        catImage.src = catData[0].url;

        // Отримання іншої інформації про кота
        const breedInfo = breeds.find(breed => breed.id === selectedBreedId);
        const catDescription = document.createElement('p');
        catDescription.textContent = `Назва породи: ${breedInfo.name}\nОпис: ${breedInfo.description}\nТемперамент: ${breedInfo.temperament}`;

        // Відображення інформації про кота
        catInfo.appendChild(catImage);
        catInfo.appendChild(catDescription);
      } catch (e) {
        // Обробка помилки під час отримання інформації про кота
        loader.style.display = 'none';
        error.style.display = 'block';
      } finally {
        // Приховання завантажувача після завершення запиту
        loader.style.display = 'none';
      }
    });
  } catch (e) {
    // Обробка помилки під час отримання списку порід
    loader.style.display = 'none';
    error.style.display = 'block';
  }
});
