export default {
  SiteName: 'News Up',
  auth: {
    login: 'Zaloguj się',
    register: 'Zarejestruj się',
    email: 'E-mail',
    password: 'Hasło',
    name: 'Imię',
    lastName: 'Nazwisko',
    birthday: 'Data urodzenia',
    remember: 'Zapamiętaj mnie',
    acceptTerms: 'Akceptuję regulamin serwisu',
    sex: {
      title: 'Płeć',
      male: 'Mężczyzna',
      female: 'Kobieta'
    },
    activate: {
      title: 'Aktywuj konto',
      key: 'Wpisz kod aktywacyjny',
      success: 'Twoje konto zostało aktywowane',
      invalid: 'Coś poszło nie tak, spróbuj ponownie',
      refresh: 'Przypomnij kod',
      refreshSuccess: 'Nowy kod został wysłany na podany adres e-mail'
    },
    notify: {
      registerSuccess: 'Konto zostało pomyślnie utworzone',
      401: 'Podano nieprawidłowe dane'
    }
  },
  navBar: {
    login: 'Zaloguj się',
    register: 'Zarejestruj się',
    pages: {
      home: 'Strona główna',
      articles: 'Artykuły',
      peoples: 'Ludzie'
    },
    dropdown: {
      profile: {
        t: 'Konto',
        d: 'Twoje konto'
      },
      articles: {
        t: 'Artykuły',
        d: 'Twoje artykuły'
      },
      settings: {
        t: 'Ustawienia',
        d: ''
      },
      logout: {
        t: 'Wyloguj się',
        d: ''
      },
      friends: {
        t: 'Znajomi',
        d: 'Twoi znajomi'
      },
      groups: {
        t: 'Grupy',
        d: 'Twoje grupy'
      }
    }
  },
  friends: {
    addFriend: 'Zaproś do znajomych'
  },
  articles: {
    viewComments: 'Wyświetl komentarze'
  },
  search: {
    articles: {
      title: 'Tytuł ...',
      category: 'Wybierz kategorię',
      location: 'Lokalizacja ...'
    },
    submit: 'Szukaj'
  },
  comments: {
    title: 'Komentarze',
    create: {
      title: 'Dodaj komentarz',
      placeholder: 'Wprowadź tekst komentarze ...'
    },
    edit: {
      title: 'Edytuj komentarz',
      placeholder: 'Edytuj komentarz'
    },
    answers: {
      create: {
        title: 'Dodaj odpowiedź',
        placeholder: 'Wprowadź treść odpowiedzi ...'
      },
      edit: {
        title: 'Edytuj odpowiedź',
        placeholder: 'Edytuj odpowiedź'
      }
    }
  },
  notification: {
    errors: {
      loadData: 'Nie udało się załadować danych',
      validData: 'Popraw błędy i spróbuj ponownie',
      invalid: 'Coś poszło nie tak'
    },
    success: {
      loadData: 'Dane załadowane pomyślnie',
      successOperation: 'Akcja zakończona sukcesem'
    },
    info: {
      noData: 'No data to display',
      noAdded: 'Nie dodano'
    }
  },
  basicOptions: {
    yes: 'Tak',
    no: 'Nie',
    private: 'Prywatne',
    public: 'Publiczne'
  },
  buttons: {
    save: 'Zapisz',
    delete: 'Usuń',
    edit: 'Edytuj',
    create: 'Utwórz',
    cancel: 'Anuluj',
    search: 'Szukaj',
    submit: 'Wyślij'
  },
  account: {
    welcome: 'Cześć',
    photos: 'Zdjęcia',
    friends: 'Znajomi',
    look: 'Zobacz',
    articles: 'Artykuły',
    users: 'Użytkownicy',
    information: {
      title: 'Informacje',
      user: 'Użytkownik',
      email: 'E-mail',
      contactData: 'Dane kontaktowe',
      contactPhone: 'Telefon kontaktowy',
      birthday: 'Data urodzenia',
      dateRegister: 'Data rejestracji'
    },
    watching: 'Obserwowani',
    watchingYou: 'Obserwujący',
    navBar: {
      home: 'Strona główna',
      dashboard: 'Dashboard',
      articles: 'Artykuły',
      friends: 'Znajomi',
      photos: 'Zdjęcia',
      groups: 'Grupy',
      settings: 'Ustawienia',
      logout: 'Wyloguj się'
    },
    pages: {
      settings: {
        basicData: {
          name: 'Imię',
          lastName: 'Nazwisko',
          phone: 'Telefon',
          postCode: 'Kod pocztowy',
          city: 'Miasto',
          address: 'Adres',
          sex: {
            title: 'Płeć',
            male: 'Mężczyzna',
            female: 'Kobieta'
          },
          email: {
            new: 'Wpisz nowy adres e-mail ...',
            key: 'Wpisz kod weryfikujący',
            successUpdate: 'Adres e-mail został zmieniony. Zaloguj się ponownie a następnie potwierdź swoje konto',
            sendKey: 'Wysłano kod weryfikacyjny'
          }
        },
        avatar: {
          title: 'Zdjęcie profilowe'
        }
      },
      groups: {
        filters: {
          title: 'Wybierz',
          yourGroups: 'Grupy dodane przez Ciebie',
          belongTo: 'Grupy do których należysz'
        },
        userOptions: {
          members: 'Wszyscy członkowie',
          administrators: 'Administratorzy',
          author: 'Autor'
        },
        create: {
          name: 'Nazwa grupy',
          type: 'Wybierz typ grupy',
          description: 'Opis',
          acceptPost: 'Czy posty muszą być akceptowane?',
          bgImage: 'Główne zdjęcie grupy'
        },
        subNavBar: {
          info: 'Informacje',
          posts: 'Posty',
          photos: 'Zdjęcia'
        },
        posts: {
          create: {
            content: 'Wpisz treść ...',
            images: 'Dodaj zdjęcia'
          }
        },
        notify: {
          successCreateGroup: 'Grupa została utworzona',
          successCreatePost: 'Post został dodany',
          successEditGroup: 'Dane grupy zostały zmienione',
          successEditPostGroup: 'Post został zmieniony',
          removeGroup: 'Grupa została usunięta',
          removePost: 'Post został usunięty'
        }
      },
      albums: {
        viewDescription: 'Wyświetl opis',
        editAlbum: 'Edytuj album',
        create: {
          name: 'Nazwa albumu',
          description: 'Opis'
        },
        photos: {
          create: {
            title: 'Dodaj zdjęcia',
            selectAlbum: 'Wybierz album',
            uploadImages: 'Prześlij zdjęcia'
          }
        }
      },
      friends: {
        filters: {
          title: 'Wybierz',
          waiting: 'Oczekujące',
          sent: 'Wysłane',
          friends: 'Znajomi'
        }
      },
      articles: {
        filters: {
          title: 'Wybierz',
          new: 'Nowe',
          published: 'Opublikowane',
          locked: 'Zablokowane',
          improve: 'Do poprawy',
          archive: 'Archiwum',
        },
        create: {
          title: 'Tytuł',
          category: 'Wybierz kategorię',
          images: 'Prześlij zdjęcia',
          isRating: 'Możliwość oceniania',
          isComment: 'Możliwość komentowania',
          location: 'Lokalizacja',
          content: 'Treść',
        },
        notify: {
          successRemove: 'Artykuł został usunięty',
          successUpdate: 'Artykuł został zmieniony'
        },
        options: {
          title: 'Opcje',
          edit: 'Edytuj',
          archive: 'Archiwizuj',
          preview: 'Zobacz',
          delete: 'Usuń na stałe',
          unArchive: 'Usuń z archiwum'
        }
      },
      titles: {
        settings: 'Ustawienia',
        groups: 'Grupy',
        createGroup: 'Utwórz grupę',
        editGroup: 'Edytuj grupę',
        albums: 'Albumy',
        createAlbum: 'Dodaj album',
        addPhotos: 'Dodaj zdjęcia',
        friends: 'Znajomi',
        articles: 'Artykuły',
        createArticle: 'Utwórz artykuł',
        editArticle: 'Edytuj artykuł'
      }
    }
  },
  profilePage: {
    navBar: {
      dashBoard: 'Dashboard',
      information: 'Informacje',
      articles: 'Artykuły',
      friends: 'Znajomi',
      photos: 'Zdjęcia'
    },
    pages: {
      dashBoard: {
        latestArticles: 'Ostatnie artykuły'
      },
      information: {
        name: 'Imię i nazwisko',
        email: 'E-mail',
        phone: 'Telefon',
        birthday: 'Data urodzenia',
        addressOne: 'Adres',
        addressTwo: 'Adres',
        sex: {
          title: 'Płeć',
          male: 'Mężczyzna',
          female: 'Kobieta'
        },
        created: 'Użytkownik od'
      },
      articles: {
        search: {
          title: 'Tytuł',
          category: 'Wybierz kategorię',
          location: 'Lokalizacja'
        }
      },
      titles: {
        information: 'Informacje',
        friends: 'Znajomi',
        photos: 'Zdjęcia',
        articles: 'Artykuły'
      }
    }
  },
  home: {
    trendingArticles: 'Popularne artykuły',
    featuredArticles: 'Specjalne artykuły',
    latestPhotos: 'Ostatnie zdjęcia',
    latestArticles: 'Ostatnio dodane artykuły',
    articlesFromPageCreators: 'Artykuły twórców serwisu',
    listCategories: {
      all: 'Wszystkie'
    }
  },
  global: {
    unFollow: 'Usunięto z obserwowanych',
    removeComment: 'Komentarz został usunięty',
    removeReplyComment: 'Odpowiedź została usunięta',
    addFollow: 'Dodano do obserwowanych',
    addRating: 'Ocena została dodana',
    addComment: 'Komentarz został dodany',
    addReplyComment: 'Odpowiedź została dodana',
    updateReply: 'Odpowiedź została zmieniona',
    updatedComment: 'Komentarz został zmieniony'
  }
}
