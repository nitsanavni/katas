port module Main exposing (main)

import Platform exposing (Program)


type alias InputType = Int
type alias OutputType = Int

port get : (InputType -> msg) -> Sub msg

port put : OutputType -> Cmd msg


main : Program Flags Model Msg
main =
    Platform.worker
        { init = init
        , update = update
        , subscriptions = subscriptions
        }

type alias Model =
    ()


type Msg
    = Input Int


type alias Flags =
    ()


init : Flags -> ( Model, Cmd Msg )
init _ =
    ( (), Cmd.none )

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Input input -> ( model, put (transform input))


subscriptions : Model -> Sub Msg
subscriptions _ =
    get Input

{- Below is the input-to-output transformation.
   It could be anything.  Here we have something
   simple for demonstration purposes.
-}

transform : InputType -> OutputType
transform k =
    case modBy 2 k == 0 of
        True -> k // 2
        False -> 3*k+ 1
