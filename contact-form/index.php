<form action="mail.php">
    <h2>Contact form:</h2>
    <div>
        <input type="text" id="name" name="name" placeholder="Name" required>
        <label for="name">name</label>
    </div>
    <div>
        <input type="email" id="email" name="email" placeholder="Email" required>
        <label for="email">email</label>
    </div>
    <div>
        <input type="text" id="subject" name="subject" placeholder="Subject" required>
        <label for="subject">subject</label>
    </div>
    <div>
        <textarea id="message" name="message" placeholder="Message"></textarea>
        <label for="message">message</label>
    </div>
    <input type="submit">
</form>