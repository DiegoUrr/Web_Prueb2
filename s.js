$(document).ready(function() {
    let cart = [];

    // Añadir producto al carrito
    $('.add-to-cart').click(function() {
        const product = $(this).closest('.card');
        const productName = product.find('.card-title').text();
        const productPrice = parseInt(product.find('.card-text').text().replace('$', '').replace(' CLP', ''));

        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        updateCart();
        updateCartCount();
        alert('Producto añadido al carrito');
    });

    // Actualizar la vista del carrito
    function updateCart() {
        $('#cart-items').empty();
        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            $('#cart-items').append(`
                <div class="cart-item mb-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <p class="mb-0">${item.name}</p>
                            <small>$${item.price.toLocaleString()} CLP x ${item.quantity} = $${itemTotal.toLocaleString()} CLP</small>
                        </div>
                        <button class="btn btn-sm btn-danger remove-from-cart" data-index="${index}">Eliminar</button>
                    </div>
                </div>
            `);
        });
        $('#cart-total').text(total.toLocaleString());
    }

    // Actualizar el contador del carrito
    function updateCartCount() {
        $('#cart-count').text(cart.length);
    }

    // Eliminar producto del carrito
    $(document).on('click', '.remove-from-cart', function() {
        const index = $(this).data('index');
        cart.splice(index, 1);
        updateCart();
        updateCartCount();
    });

    // Proceder al pago
    $('#checkout').click(function() {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
        } else {
            alert('Procediendo al pago...');
            // Aquí puedes agregar la lógica para el proceso de pago.
        }
    });
    function updateCart() {
        $('#cart-items').empty();
        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            $('#cart-items').append(`
                <div class="cart-item mb-3">
                    <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                    <button class="btn btn-sm btn-danger remove-from-cart" data-index="${index}">Eliminar</button>
                </div>
            `);
        });
        $('#cart-total').text(total.toFixed(2));
    }


    function updateCartCount() {
        $('#cart-count').text(cart.length);
    }


    $(document).on('click', '.remove-from-cart', function() {
        const index = $(this).data('index');
        cart.splice(index, 1);
        updateCart();
        updateCartCount();
    });


    $('#checkout').click(function() {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
        } else {
            alert('Procediendo al pago...');

        }
    });

    $('#contactForm').submit(function(event) {
        event.preventDefault();
        if (validateForm()) {
            alert('Formulario enviado con éxito!');
            $('#contactForm')[0].reset();
        }
    });

    function validateForm() {
        const name = $('#name').val();
        const email = $('#email').val();
        const message = $('#message').val();

        if (name === '' || email === '' || message === '') {
            alert('Todos los campos son obligatorios.');
            return false;
        }

        if (!validateEmail(email)) {
            alert('Por favor, ingresa un email válido.');
            return false;
        }

        return true;
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});