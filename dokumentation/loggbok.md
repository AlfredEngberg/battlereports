# 06-09 2024
Idag så skrev jag färdigt planeringen och jag lade till allt i database.
Jag hade lite problem med designen av databasen och dess upplägg. Men med Jens hjälp så fixades det utan några större problem. Jens hjälpte mig med hur jag bör tänka kring designen och gav förslag på att ändra en tabell från stats till game. Innan idag så hade jag problem med hur kopplingen mellan användare och listor skulle vara. Med det jag hade tidigare så kunde en användare max ha 1 lista, då man ägde bara 1 lista. Med det nya sättet så har listorna en ägare, vilket innebär att man kan ha hur många listor som helst.

# 11-04 2024
Idag så har jag jobbat med att fixa inloggning och att städa och döpa om allt så jag inte blandar engelska och svenska, syftet med det är att göra det mindre rörigt och att jag ska förstå vad som . Jag har haft ett fokus på hash men det har inte gått så bra. Jag har inte kommit så långt i inloggningen men jag har instalerat bcrypt och ska fortsätta med inloggningen nästa lektion.

# 16-04 2024
Idag så lade jag in session i projektet och fixade inloggningen. Det var otroligt mycket trubbel med det. Jag hade skrivit fel på "newuser" ett flertal gånger, jag hade också problem med sql frågan, jag hade problem med att förstå hur det fungerade. Men nu vet jag vad jag har gjort och det fungerar som det ska och man kan skapa en ny användare och logga in.

# 22-04 2024
Idag så fixade jag så att man kan skapa en ny användare och när man skapar en ny användare så tas man till login sidan. Sen när man är inloggad så ser man en ny knapp som man kan skapa listor på. Jag har skapat ett formulär där som man ska använda för att skapa en ny lista. Det största problemet med detta är att välja vilket spel som man ska använda, först tänkte jag en dropdown meny men det verkade ganska svårt och jag fick inte till det så jag kollade på andra alternativ och kom fram till att checkbox skulle fungera lika bra och vara lättare så det ska bli det. Nästa lektion 