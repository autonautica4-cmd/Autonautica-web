<?php
// Provjera je li forma poslana putem POST metode
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Primanje podataka i čišćenje od neželjenog koda (Sigurnost)
    $plovilo = isset($_POST['Plovilo']) ? htmlspecialchars(strip_tags(trim($_POST['Plovilo']))) : "Nepoznato plovilo";
    $ime     = isset($_POST['Ime']) ? htmlspecialchars(strip_tags(trim($_POST['Ime']))) : "";
    $email   = isset($_POST['Email']) ? filter_var(trim($_POST['Email']), FILTER_SANITIZE_EMAIL) : "";
    $poruka  = isset($_POST['Poruka']) ? htmlspecialchars(strip_tags(trim($_POST['Poruka']))) : "";

    // 2. Validacija obaveznih polja
    if (empty($ime) || empty($email) || empty($poruka) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Molimo ispravno ispunite sva polja u formi.";
        exit;
    }

    // 3. Postavke primatelja 
    $primatelj = "info@autonautica.hr"; 
    
    // 4. Dinamički naslov e-maila
    $naslov = "Novi upit s web stranice - " . $plovilo;
    
    // 5. Kreiranje sadržaja e-mail poruke
    $sadrzaj_emaila = "Stigao je novi upit putem web stranice Autonautica:\n";
    $sadrzaj_emaila .= "--------------------------------------------------\n";
    $sadrzaj_emaila .= "Model plovila: " . $plovilo . "\n";
    $sadrzaj_emaila .= "Ime i prezime: " . $ime . "\n";
    $sadrzaj_emaila .= "E-mail adresa: " . $email . "\n";
    $sadrzaj_emaila .= "--------------------------------------------------\n\n";
    $sadrzaj_emaila .= "Poruka korisnika:\n" . $poruka . "\n";

    // 6. Zaglavlja (Headers) - slanje s info@autonautica.hr na info@autonautica.hr
    // 'Reply-To' omogućuje da jednim klikom na 'Odgovori' pišete kupcu, a ne sami sebi.
    $headers = "From: Autonautica Web <info@autonautica.hr>\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // 7. Slanje e-maila i povratna poruka korisniku
    if (mail($primatelj, $naslov, $sadrzaj_emaila, $headers)) {
        http_response_code(200);
        echo "Hvala vam! Vaš upit je uspješno poslan. Uskoro ćemo vam se javiti.";
    } else {
        http_response_code(500);
        echo "Došlo je do pogreške na poslužitelju pri slanju. Molimo pokušajte ponovno kasnije.";
    }

} else {
    http_response_code(403);
    echo "Pristup zabranjen.";
}
?>
