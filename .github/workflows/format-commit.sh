#!/bin/bash

# Get the commit message from standard input
read -r commit_message

# Define a function to check the flag and format the message
format_message() {
  flag=${commit_message:0:1}  # Extract the first letter
  message=${commit_message:1}   # Get the remaining message
  case $flag in
    f)  echo "[FEAT] $message" ;;
    c)  echo "[CHORE] $message" ;;
    # Add more cases for other flags here
    *)  echo "Invalid flag: '$flag'. Please use a valid flag like 'f' or 'c'." >&2
        exit 1 ;;
  esac
}

# Call the format_message function and store the formatted message
formatted_message=$(format_message)

# Check if the formatted message is valid (no errors from format_message)
if [[ $? -eq 0 ]]; then
  # Print the formatted message (can be used within the workflow script)
  echo "$formatted_message"
else
  # Exit with an error code if the format is invalid (causes workflow failure)
  exit 1
fi
