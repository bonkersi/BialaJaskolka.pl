/* ... (zachowaj poprzednie style) ... */

/* Sekcje */
.section {
    margin: 40px 0;
    padding: 20px 0;
    border-top: 1px solid #333;
}

/* Aktualności */
.news-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.news-item {
    background: rgba(255, 255, 255, 0.05);
    padding: 20px;
    border-radius: 5px;
    transition: transform 0.3s;
}

.news-item:hover {
    transform: translateY(-5px);
}

.news-item h3 {
    color: gold;
    margin-bottom: 10px;
}

.news-item time {
    display: block;
    color: #aaa;
    margin-bottom: 10px;
    font-size: 0.9rem;
}

.read-more {
    display: inline-block;
    margin-top: 10px;
    color: gold;
    text-decoration: none;
}

.read-more:hover {
    text-decoration: underline;
}

/* Wsparcie */
.support-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-top: 20px;
}

.option {
    background: rgba(255, 255, 255, 0.05);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
}

.option h3 {
    color: gold;
    margin-bottom: 15px;
}

.donate-btn, .volunteer-btn {
    background: gold;
    color: #000;
    border: none;
    padding: 10px 20px;
    margin-top: 15px;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    transition: background 0.3s;
}

.donate-btn:hover, .volunteer-btn:hover {
    background: #ffd700;
}

/* Kontakt */
.contact-form {
    max-width: 600px;
    margin: 30px 0;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: gold;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px;
    background: #111;
    border: 1px solid #333;
    color: white;
    border-radius: 5px;
}

.submit-btn {
    background: gold;
    color: #000;
    border: none;
    padding: 12px 25px;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    transition: background 0.3s;
}

.submit-btn:hover {
    background: #ffd700;
}

.contact-info {
    margin-top: 30px;
    line-height: 1.8;
}

/* Responsywność */
@media (max-width: 768px) {
    .news-container,
    .support-options {
        grid-template-columns: 1fr;
    }
    
    .contact-form {
        padding: 0 10px;
    }
}