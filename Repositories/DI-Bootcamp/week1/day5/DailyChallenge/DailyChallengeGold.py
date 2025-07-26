while True:
    program = input("Do you want to encrypt or decrypt a message? (type encrypt or decrypt) ")
    shift = int(input("Choose a shift: "))

    if program == "encrypt":
        text = input("Write a message: ")
        cypher_text = [chr(ord(letter) + shift) for letter in text]
        print("Encrypted message:", "".join(cypher_text))
        break  # exit the loop

    elif program == "decrypt":
        text = input("Write a message: ")
        cypher_text = [chr(ord(letter) - shift) for letter in text]
        print("Decrypted message:", "".join(cypher_text))
        break  # exit the loop

    else:
        print("Invalid choice. Please type 'encrypt' or 'decrypt'.\n")
