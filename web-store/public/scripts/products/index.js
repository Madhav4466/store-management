document.addEventListener("DOMContentLoaded", function() {
    const productViewModalElement = document.getElementById('productViewModal');
    const productViewModal = new bootstrap.Modal(productViewModalElement, {
        focus: true
    });
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    const productEditModalElement = document.getElementById('productEditModal');
    const productEditModal = new bootstrap.Modal(productEditModalElement, {focus: true});
    let currentProductId;

    const productViews = document.querySelectorAll('.product-view-group button');
    const productViewContainer = document.querySelector('.product-view-container');

    productViews?.forEach((button) => {
        button.addEventListener("click", async function() {
            const view = this.textContent.toLowerCase();
            loadView(view);
            productViews.forEach((btn) => {
                btn.classList.remove("active");
            });
            this.classList.add("active");
        });

    });

    async function loadView(view) {
        try{
            const response = await fetch(`/products/view/${view}`);
            const html = await response.text();
            productViewContainer.innerHTML = html;
            attachEvents();
        }
        catch(error){
            console.error(error);
        }
    }

    function attachEvents() {
        document.querySelectorAll(".view-product").forEach((button) => {
            button.addEventListener("click", async function() {
                
                const productId = this.getAttribute("data-product-id");
                const response = await fetch(`/products/details/${productId}`);
                const product = await response.json();
                const fields = ['name', 'sku', 'unit', 'dimension', 'weight', 'brand', 'manufacturer', 'openingStock', 'openingStockRPU', 'salePrice', 'purchasePrice', 'saleDescription', 'purchaseDescription', 'category', 'color'];
                fields.forEach(field => {
                    if(field === 'color') {
                        productViewModalElement.querySelector(`.${field}`).innerHTML = `<div style="width: 20%; background-color: ${product[field]}">${product[field]}</button>`;
                        return;
                    }
                    else if(field === 'salePrice' || field === 'purchasePrice') {
                        productViewModalElement.querySelector(`.${field}`).innerText = `Price: Rs ${product[field]}`;
                        return;
                    }
                    else {
                        productViewModalElement.querySelector(`.${field}`).innerText = product[field];
                    }
                });
                productViewModalElement.querySelector('.view-modal-delete').setAttribute('data-product-id', productId);
                productViewModalElement.querySelector('.view-modal-edit').setAttribute('data-product-id', productId);
                currentProductId = productId;
                productViewModal.show();
            });
        });
    
        document.querySelectorAll('.delete-product').forEach(button => {
            button.addEventListener('click', function() {
                currentProductId = this.getAttribute('data-product-id');
                deleteModal.show();
            });
        });
        document.querySelectorAll('.view-modal-delete').forEach(button => {
            button.addEventListener('click', function() {
                currentProductId = this.getAttribute('data-product-id');
                deleteModal.show();
            });
        });
    
        document.getElementById('confirmDelete').addEventListener('click', async function() {
            const response = await fetch(`/products/details/${currentProductId}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            deleteModal.hide();
            location.reload(); // Reload the page to see the changes
        });
    
        document.querySelectorAll('.edit-product, .view-modal-edit').forEach(button => {
            button.addEventListener('click', async function() {
                const productId = this.getAttribute('data-product-id');
                const response = await fetch(`/products/details/${productId}`);
                const product = await response.json();
                const fields = ['name', 'sku', 'unit', 'dimension', 'weight', 'brand', 'manufacturer', 'openingStock', 'openingStockRPU', 'salePrice', 'purchasePrice', 'saleDescription', 'purchaseDescription', 'category', 'color'];
                fields.forEach(field => {
                    productEditModalElement.querySelector(`#${field}`).value = product[field];
                });
                currentProductId = productId;
                productEditModal.show();
            });
        });
    
        productEditModalElement.querySelector('.modal-edit-product').addEventListener('click', async function() {
            const form = productEditModalElement.querySelector('#edit-product-form');
            await form.requestSubmit();
        });
    
        productEditModalElement.querySelector('#edit-product-form').addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            try {
                const response = await fetch(`/products/details/${currentProductId}/edit`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const product = await response.json();
                productEditModal.hide();
                location.reload();
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        });
    }
    
    loadView("grid");
});
