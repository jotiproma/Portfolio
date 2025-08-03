
        // JavaScript for Bird Animation
        const canvas = document.getElementById('birdCanvas');
        const ctx = canvas.getContext('2d');

        let birds = [];
        const numBirds = 30; // Number of birds
        const birdSize = 8; // Base size of the bird
        const birdSpeed = 0.5; // Base speed of the bird

        // Function to resize canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Bird constructor function
        function Bird() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = birdSize + Math.random() * 5; // Vary size slightly
            this.speed = birdSpeed + Math.random() * 0.5; // Vary speed slightly
            this.direction = Math.random() < 0.5 ? 1 : -1; // 1 for right, -1 for left
            this.color = `rgba(255, 192, 203, ${0.5 + Math.random() * 0.3})`; // Pinkish, slightly transparent
            this.wingFlap = 0; // For wing animation
            this.wingSpeed = 0.1 + Math.random() * 0.1; // Speed of wing flap
        }

        // Draw bird function
        Bird.prototype.draw = function() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            // Simple bird shape (two triangles for body and wing)
            // Body
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.size * this.direction, this.y - this.size / 2);
            ctx.lineTo(this.x + this.size * this.direction, this.y + this.size / 2);
            ctx.closePath();
            ctx.fill();

            // Wing (simple line or small triangle for flap effect)
            ctx.beginPath();
            ctx.moveTo(this.x + this.size * this.direction / 2, this.y);
            ctx.lineTo(this.x + this.size * this.direction / 2 + this.size * 0.8 * Math.sin(this.wingFlap) * this.direction, this.y - this.size * 0.8 * Math.abs(Math.cos(this.wingFlap)));
            ctx.stroke(); // Draw wing as a line
        };

        // Update bird position
        Bird.prototype.update = function() {
            this.x += this.speed * this.direction;
            this.wingFlap += this.wingSpeed;

            // If bird goes off screen, reset its position to the other side
            if (this.direction === 1 && this.x > canvas.width + this.size) {
                this.x = -this.size;
                this.y = Math.random() * canvas.height; // New random height
            } else if (this.direction === -1 && this.x < -this.size) {
                this.x = canvas.width + this.size;
                this.y = Math.random() * canvas.height; // New random height
            }
        };

        // Initialize birds
        function initBirds() {
            birds = [];
            for (let i = 0; i < numBirds; i++) {
                birds.push(new Bird());
            }
        }

        // Animation loop
        function animateBirds() {
            requestAnimationFrame(animateBirds);
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

            birds.forEach(bird => {
                bird.update();
                bird.draw();
            });
        }

        // Event Listeners
        window.addEventListener('resize', resizeCanvas);
        window.onload = function() {
            resizeCanvas(); // Initial canvas resize
            initBirds();    // Initialize birds
            animateBirds(); // Start animation
        };
    