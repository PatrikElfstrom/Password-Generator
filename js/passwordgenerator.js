jQuery(function() {
    var form = jQuery('#passwordgenerator');
    
    form.submit(function() {
        passwordGenerator(this);
        return false;
    });
    
    jQuery(document).ready(function() {
        passwordGenerator(form);
    });
    
    jQuery('#generated-passwords').on('click', 'li', function() {
        selectText(this);
    });
    
     $( "#passphrase-word-length" ).slider({
            range: true,
            min: 2,
            max: 18,
            values: [ 4, 18 ],
            slide: function( event, ui ) {
                $( "#passphrase-word-length-min" ).val(ui.values[0]);
                $( "#passphrase-word-length-max" ).val(ui.values[1]);
            }
        });
});

function selectText(element) {
    var doc = document, 
        text = jQuery(element)[0], 
        range, selection
    ;    
    if (doc.body.createTextRange) { //ms
        range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) { //all others
        selection = window.getSelection();        
        range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

var passwordGenerator = function(form) {
    // Characters
    var characterSets = {
        letters                 : 'abcdefghjkmnpqrstuvwxyz',
        upperCase               : 'ABCDEFGHJKLMNPQRSTUVWXYZ',
        numbers                 : '23456789',
        punctuation             : '!"#$%&()*+,-./:;<=>?@[]^_{|}~',
        similarLetters          : 'ilo',
        similarLettersUpperCase : 'IO',
        similarNumbers          : '10'
    };
    
    // Set default options
    var passwordLength              = 8,
        passphraseLength            = 4,
        passphraseWordLengthMin     = 10,
        passphraseWordLengthMax     = 18,
        quantity                    = 1,
        passType                    = 'password',
        includeLetters              = true,
        includeUppercase            = true,
        includeNumbers              = true,
        includePunctuation          = true,
        includeSimilarCharacters    = false,
        excludeCharacters           = '',
        passphraseExcludeWords      = '';
    
    // Get user options
    passType                    = getFieldValue('passtype');
    passwordLength              = getFieldValue('password-length');
    includeLetters              = getFieldValue('letters');
    includeUppercase            = getFieldValue('uppercase');
    includeNumbers              = getFieldValue('numbers');
    includePunctuation          = getFieldValue('punctuation');
    includeSimilarCharacters    = getFieldValue('similar');
    excludeCharacters           = getFieldValue('exclude');
    quantity                    = getFieldValue('quantity');
    passphraseLength            = getFieldValue('passphrase-length');
    passphraseWordLengthMin     = getFieldValue('passphrase-word-length-min');
    passphraseWordLengthMax     = getFieldValue('passphrase-word-length-max');
    passphraseExcludeWords      = getFieldValue('passphrase-exclude');
    
    // Remove old passwords
    var generatedPasswords = jQuery('#generated-passwords');
    jQuery('.generated-password', generatedPasswords).remove();
    
    switch(passType) {
        case 'passphrase': generatePassphrase(); break;
        default: 
        case 'password': generatePassword(); break;
    }
    
    function printPass(pass) {
        jQuery('<li class="list-group-item generated-password"></li>').text(pass).hide().appendTo(generatedPasswords).fadeIn('fast');
    }
    
    function generatePassphrase() {
        loadWordlist(function(wordList) {
            var words = wordList.split(/\r\n|\r|\n/);
            var numberOfWords = words.length;
            var excludeWordsArray = passphraseExcludeWords.split(' ');
            
            for(var q = 0; q < quantity; q++) {
                var passphrase = [];
                
                for(var l = 0; l < passphraseLength; l++) {
                    var word, wordValid = false;
                    
                    while(wordValid === false) {
                        var randomIndex = generateRandomNumber(numberOfWords);
                        word = words[randomIndex];
                        var wordLength = word.length;
                        
                        // if word is the right length
                        if(wordLength >= passphraseWordLengthMin && wordLength <= passphraseWordLengthMax) {
                            // If the word is not in the exclude word list quit the while loop.
                            if(jQuery.inArray(word, excludeWordsArray) === -1) {
                                wordValid = true;
                            }
                        }
                    }
                    
                    passphrase.push(word);
                }
            
                passphrase = passphrase.join(' ');
                printPass(passphrase);
            }
        });
    }
    
    function loadWordlist(callback) {
        $.ajax('wordlist.txt', {
            success: function(wordList) {
                if(callback) { callback(wordList); }
            }
        });
    }
    
    function generatePassword() {
        for(var q = 0; q < quantity; q++) {
            var password = '';
            var availableCharactersExist = checkAvailableCharacters();
            
            if((includeLetters || includeUppercase || includeNumbers || includePunctuation) && availableCharactersExist) {
                for(var l = 0; l < passwordLength; l++) {
                
                    // Loop until we get a random character. RandomCharacter is false if the user has turned of the character type.
                    var randomCharacter = false;
                    while(randomCharacter === false) {
                    
                        // Generate a random type of character, letter, number, punctuation etc.
                        var randomCase = generateRandomNumber(4);
                        switch(randomCase) {
                            case 0: randomCharacter = generateRandomCharacter(includeLetters, characterSets.letters, characterSets.similarLetters); break;
                            case 1: randomCharacter = generateRandomCharacter(includeUppercase, characterSets.upperCase, characterSets.similarLettersUpperCase); break;
                            case 2: randomCharacter = generateRandomCharacter(includeNumbers, characterSets.numbers, characterSets.similarNumbers); break;
                            case 3: randomCharacter = generateRandomCharacter(includePunctuation, characterSets.punctuation); break;
                        }
                    }
                    password += randomCharacter;
                }
            }
            
            printPass(password);
        }
    }
    
    function checkAvailableCharacters() {
        var availableCharactersExist = false;
        var fullCharacterSet = '';   
        
        var letters = shouldCharactersBeIncluded(includeLetters, characterSets.letters, characterSets.similarLetters);
        var upperCase = shouldCharactersBeIncluded(includeUppercase, characterSets.upperCase, characterSets.similarLettersUpperCase);
        var numbers = shouldCharactersBeIncluded(includeNumbers, characterSets.numbers, characterSets.similarNumbers);
        var punctuation = shouldCharactersBeIncluded(includePunctuation, characterSets.punctuation);
        
        fullCharacterSet += letters ? letters : '';
        fullCharacterSet += upperCase ? upperCase : '';
        fullCharacterSet += numbers ? numbers : '';
        fullCharacterSet += punctuation ? punctuation : '';
        
        var fullCharacterArray = fullCharacterSet.split('');
        $.each(fullCharacterArray, function(index, character) {
        
            // If an available character is not in the excluded character list return true
            if(excludeCharacters.indexOf(character) === -1) {
                availableCharactersExist = true;
            }
        });
        
        return availableCharactersExist;
    }
    
    // This function will return callback if callback is defined
    // Else it will return the character set
    // If characters should not be included, false will be returned
    function shouldCharactersBeIncluded(shouldBeIncluded, characters, similarCharacters, callback) {
        var characterSet = false;
        if(shouldBeIncluded) {
            characterSet = characters;
            
            if(similarCharacters) {
                characterSet += includeSimilarCharacters ? similarCharacters : '';
            }
            
            if(callback) {
                characterSet = callback(characterSet);
            }
        }
        return characterSet;
    }
    
    function generateRandomCharacter(shouldBeIncluded, characters, similarCharacters) {
        var character = false;
        
        // Since the callback is defined this will return the character or false if it should not be included.
        character = shouldCharactersBeIncluded(shouldBeIncluded, characters, similarCharacters, function(characterSet) {
        
            // Generate a random character
            var charactersList = characterSet.split('');
            var randomIndex = generateRandomNumber(charactersList.length);
            var character = charactersList[randomIndex];
            
            // Check if character is excluded
            character = excludeCharacters.indexOf(character) > -1 ? false : character;
            
            return character;
        });
        
        return character;
    }
    
    function generateRandomNumber(maxLength) {
        // Uniform Distribution
        return Math.floor(Math.random() * maxLength);
    }
    
    function getFieldValue(fieldName) {
        var field = jQuery('[name="'+fieldName+'"]', form);
        var fieldValue = field.val();
        
        // Set to true/false if input field is a checkbox
        if(field.is('[type="checkbox"]')) {
            fieldValue = field.prop('checked');
        }
        
        if(field.is('[type="radio"]')) {
            fieldValue = field.filter(':checked').val();
        }
        
        return fieldValue;
    }
}