package main

import "log"

func login(user string, password string) {
    log.Printf("User login attempt: %s with password: %s", user, password) // don't do this
}
