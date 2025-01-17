package cmd

import (
	"github.com/kitesi/music/commands/lastfm"
	"github.com/kitesi/music/commands/play"
	"github.com/kitesi/music/commands/spotify"
	"github.com/kitesi/music/commands/tags"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:     "music",
	Version: "1.1.0",
}

func Execute() {
	lastfmCommand := &cobra.Command{
		Use:   "lastfm",
		Short: "Lastfm utilities",
		Long:  "Scrobble, get recommendations, and other lastfm functions",
	}

	spotifyCommand := &cobra.Command{
		Use:   "spotify",
		Short: "Spotify utilities",
		Long:  "Import playlists from Spotify",
	}

	rootCmd.AddCommand(play.Setup())
	rootCmd.AddCommand(tags.Setup())
	// rootCmd.AddCommand(lyrics.Setup())
	rootCmd.AddCommand(lastfmCommand)
	rootCmd.AddCommand(spotifyCommand)

	lastfmCommand.AddCommand(lastfm.WatchSetup())
	lastfmCommand.AddCommand(lastfm.SuggestSetup())
	lastfmCommand.AddCommand(lastfm.RecentSetup())
	lastfmCommand.AddCommand(lastfm.ImportSetup())

	spotifyCommand.AddCommand(spotify.ImportSetup())
	spotifyCommand.AddCommand(spotify.SetOriginSetup())

	rootCmd.AddGroup(&cobra.Group{
		ID:    "generic",
		Title: "Generic Commands",
	})

	rootCmd.SetCompletionCommandGroupID("generic")
	rootCmd.SetHelpCommandGroupID("generic")

	rootCmd.Execute()
}
