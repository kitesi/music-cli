package stringUtils

import (
	"os"
	"path/filepath"
	"strings"
)

func GetDefaultMusicPath() (string, error) {
	dirname, err := os.UserHomeDir()
	return filepath.Join(dirname, "Music"), err
}

func GetBareSongName(song string, musicPath string) string {
	return strings.Replace(song, musicPath+"/", "", 1)
}