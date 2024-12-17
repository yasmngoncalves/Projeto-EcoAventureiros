// Seleciona todas as imagens da galeria e cria um modal dinâmico para exibição
const images = document.querySelectorAll('.gallery img');
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <img class="modal-image" src="" alt="">
    <button class="prev-btn">&#10094;</button>
    <button class="next-btn">&#10095;</button>
  </div>
`;
document.body.appendChild(modal);

const modalImage = modal.querySelector('.modal-image');
const closeBtn = modal.querySelector('.close-btn');
const prevBtn = modal.querySelector('.prev-btn');
const nextBtn = modal.querySelector('.next-btn');

let currentIndex = 0;

function openModal(index) {
    currentIndex = index;
    modal.style.display = 'block';
    modalImage.src = images[currentIndex].src;
}

function closeModal() {
    modal.style.display = 'none';
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImage.src = images[currentIndex].src;
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImage.src = images[currentIndex].src;
}

images.forEach((img, index) => {
    img.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(index);
    });
});

closeBtn.addEventListener('click', closeModal);

nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

const style = document.createElement('style');
style.textContent = `
  .modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  .modal-content {
    position: relative;
    margin: auto;
    padding: 20px;
    width: 80%;
    max-width: 1200px;
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
  
  .modal-image {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    object-fit: contain;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 50px;
    font-weight: bold;
    color:  #43A047;
    cursor: pointer;
  }
  
  .close-btn:hover {
    color: #f00;
  }
  
  .prev-btn, .next-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color:  #43A047;
    color: #fff;
    font-size: 2rem;
    border: none;
    cursor: pointer;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  
  .prev-btn {
    left: 10px;
  }
  
  .next-btn {
    right: 10px;
  }
  
  .prev-btn:hover, .next-btn:hover {
    background-color: rgba(255, 255, 255, 0.8);
    color: #000;
  }
`;
document.head.appendChild(style);
