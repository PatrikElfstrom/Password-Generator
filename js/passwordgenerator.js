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
        punctuation             : ':;><!"£$%&/()=?^*#_-@+[]{}|,.§',
        similarLetters          : 'ilo',
        similarLettersUpperCase : 'IO',
        similarNumbers          : '10'
    };
    
    // Set default options
    var length                      = 8;
    var includeLetters              = true;
    var includeUppercase            = true;
    var includeNumbers              = true;
    var includePunctuation          = true;
    var includeSimilarCharacters    = true;
    var quantity                    = 1;
    
    // Get user options
    length                      = getFieldValue('length');
    includeLetters              = getFieldValue('letters');
    includeUppercase            = getFieldValue('uppercase');
    includeNumbers              = getFieldValue('numbers');
    includePunctuation          = getFieldValue('punctuation');
    includeSimilarCharacters    = getFieldValue('similar');
    quantity                    = getFieldValue('quantity');
    
    // Remove old passwords
    var generatedPasswords = jQuery('#generated-passwords');
    jQuery('.generated-password', generatedPasswords).remove();
    
    for(var i = 0; i < quantity; i++) {
        var password = generatePassword();
        
        // Print password
        jQuery('<li class="list-group-item generated-password"></li>').text(password).hide().appendTo(generatedPasswords).fadeIn('fast');
    }
    
    function generatePassword() {
        var password = '';
        
        if(includeLetters || includeUppercase || includeNumbers || includePunctuation) {
            for(var i = 0; i < length; i++) {
            
                // Loop until we get a random character. RandomCharacter is false if the user has turned of the character type.
                var randomCharacter = false;
                while(randomCharacter === false) {
                
                    // Generate a random type of character, letter, number, punctuation etc.
                    var randomCase = generateRandomNumber(4);
                    switch(randomCase) {
                        case 0: randomCharacter = generateRandomCharacter(includeLetters, characterSets.letters, includeSimilarCharacters, characterSets.similarLetters); break;
                        case 1: randomCharacter = generateRandomCharacter(includeUppercase, characterSets.upperCase, includeSimilarCharacters, characterSets.similarLettersUpperCase); break;
                        case 2: randomCharacter = generateRandomCharacter(includeNumbers, characterSets.numbers, includeSimilarCharacters, characterSets.similarNumbers); break;
                        case 3: randomCharacter = generateRandomCharacter(includePunctuation, characterSets.punctuation); break;
                    }
                }
                
                password += randomCharacter;
            }
        }
        
        return password;
    }
    
    function generateRandomCharacter(shouldBeIncluded, characters, includeSimilarCharacters, similarCharacters) {
        var character = false;
        if(shouldBeIncluded) {
            characters += includeSimilarCharacters ? similarCharacters : '';
            
            var charactersList = characters.split('');
            var randomIndex = generateRandomNumber(charactersList.length);
            character = charactersList[randomIndex];
        }
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
        
        return fieldValue;
    }
}